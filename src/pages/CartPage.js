import React,{memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IMG_YOUR_CART_BACKGROUND} from "../assets";
import {YourCart} from "./YourCart";
import {EmptyCart} from "../component/EmptyCart";
import {useDispatch, useSelector} from "react-redux";
import {itemRemoved as comboRemoved} from "../store/cartComboSlice";
import {itemRemoved as extraRemoved, itemUpdated as extraUpdated} from "../store/cartExtraSlice";
import {itemRemoved} from "../store/cartSlice";
import {addOrder} from "../store/orderSlice";
import {
    Checkbox,
    Fade,
    FormControlLabel,
    MenuItem,
    Modal,
    Select,
    Snackbar,
    TextField,
    span
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const axios = require('axios')
const round = (num) => Math.round(num * 100) / 100;

export const CartPage = memo(function CartPage() {
    const dispatch = useDispatch();
    const [pay, SetPay] = useState(false);
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const totalPizza = cart.ids.reduce((total, itemId) => {
        return round(total + cart.entities[itemId].total)
    }, 0);
    let totalExtra = 0;
    Object.keys(cartExtras).map(category => {
        totalExtra += cartExtras[category].ids.reduce((total, itemId) => {
            return round(total + cartExtras[category].entities[itemId].total)
        }, 0);
    })
    const totalCombo = cartCombos.ids.reduce((total, itemId) => {
        return round(total + cartCombos.entities[itemId].total)
    }, 0);
    console.log('total1 - total2 - total3',totalPizza,totalExtra,totalCombo)
    const [totalValue, SetTotalValue] = useState(round(totalPizza + totalExtra + totalCombo));
    const handleCartChange = (_id) => {
        SetTotalValue(prev => round(prev - cart.entities[_id].total));
        dispatch(itemRemoved(_id));
    }
    const handleComboChange = (_id) => {
        SetTotalValue(prev => round(prev - cartCombos.entities[_id].total));
        dispatch(comboRemoved(_id));
    }
    const handleExtraChange = (category, _id, remove, add, delta, newData) => {
        if (remove) {
            SetTotalValue(prev => round(prev - delta));
            dispatch(extraRemoved({id: _id, category: category}));
        } else {
            if (add) {
                SetTotalValue(prev => round(prev + delta));
            } else {
                SetTotalValue(prev => round(prev - delta));
            }

            dispatch(extraUpdated({
                id: _id,
                category: category,
                ...newData
            }))

        }
    }
    const [customer, setCustomer] = useState('')
    const [phone, setPhone] = useState('')
    const [province, setProvince] = useState('Ha Noi')
    const [address, setAddress] = useState('')
    const [inPlace, setInPlace] = useState(false);
    const [posted, setPosted] = useState(false)
    const [message, setMessage] = useState('')
    const pros = ['Ha Noi', 'Ha Nam', 'Ninh Binh', 'Nam Dinh', 'Hai Duong', 'Hung Yen']
    const validForm = () => {
        if (customer.length === 0) return false;
        if (!inPlace) {
            if (address.length === 0) return false;
            if (province.length === 0) return false;
        }
        return /[0-9]{10}/.test(phone)
    }
    const pizzas = useSelector(state => state.pizzas.entities)
    const combos = useSelector(state => state.combos.entities)
    const makeOrder = () => {
        const shipment = inPlace || province === 'Ha Noi' ? 22000 : 40000
        const time = Date.now()
        const detail = {
            'pizza': [],
            'drink': [],
            'vegetable': [],
            'kid': [],
            'appetizer': [],
            'dessert': [],
        }
        const orderedPizzas = []
        if (cart.ids.length > 0) {
            cart.ids.map(cartId => {
                const cartPizza = cart.entities[cartId]
                const pizzaId = cartPizza.pizzaId;
                const pizza = pizzas[pizzaId]
                console.log('size1',pizza)
                orderedPizzas.push({
                    id: pizzaId,
                    size: pizza.size[cartPizza.size].type_detail,
                    type: pizza.type[cartPizza.sole],
                    topping: pizza.topping.filter((top, index) => cartPizza.toppings[index] === true).map(top => top.topping_name),
                    number: cartPizza.number
                })
            })
        }
        if (cartCombos.ids.length > 0) {
            cartCombos.ids.map(cartId => {
                const cartCombo = cartCombos.entities[cartId]
                const comboId = cartCombo.comboId
                const combo = combos[comboId]
                const comboNumber = cartCombo.number;
                let pizzaNumber = combo.pizza
                if (combo.free && combo.free.pizza) pizzaNumber += combo.free.pizza;
                if (pizzaNumber && pizzaNumber > 0) {
                    const pizzaSlot = cartCombo.pizzaSlot
                    for (let i = 0; i < pizzaNumber; i++) {
                        const pizzaInfo = pizzaSlot[i].pizzaInfo
                        const pizzaId = pizzaSlot[i].productId
                        const pizza = pizzas[pizzaId]
                        console.log('size2',pizza)
                        orderedPizzas.push({
                            id: pizzaId,
                            size: pizza.size[pizzaInfo.size].type_detail,
                            type: pizza.type[pizzaInfo.type],
                            topping: pizza.topping.filter((top, index) => pizzaInfo.topping[index] === true).map(top => top.topping_name),
                            number: comboNumber
                        })
                    }
                }
                const categories = {
                    'drink': {
                        comNumber: combo.drink ? combo.drink : 0 + combo.free && combo.free.drink ? combo.free.drink : 0,
                        slot: cartCombo.drinkSlot
                    },
                    'kid': {
                        comNumber: combo.kid ? combo.kid : 0 + combo.free && combo.free.kid ? combo.free.kid : 0,
                        slot: cartCombo.kidSlot
                    },
                    'appetizer': {
                        comNumber: combo.appetizer ? combo.appetizer : 0 + combo.free && combo.free.appetizer ? combo.free.appetizer : 0,
                        slot: cartCombo.appetizerSlot
                    },
                    'dessert': {
                        comNumber: combo.dessert ? combo.dessert : 0 + combo.free && combo.free.dessert ? combo.free.dessert : 0,
                        slot: cartCombo.dessertSlot
                    },
                    'vegetable': {
                        comNumber: combo.vegetable ? combo.vegetable : 0 + combo.free && combo.free.vegetable ? combo.free.vegetable : 0,
                        slot: cartCombo.vegetableSlot
                    },
                }
                Object.keys(categories).map(category => {
                    const number = categories[category].comNumber;
                    if (number && number > 0) {
                        const slot = categories[category].slot
                        for (let i = 0; i < number; i++) {
                            const id = slot[i].productId
                            const existedIndex = detail[category].findIndex(item => item.id === id)
                            if (existedIndex === -1) detail[category].push({
                                id: id,
                                number: comboNumber
                            })
                            else {
                                detail[category][existedIndex].number += comboNumber
                            }
                        }
                    }
                })
            })
        }
        Object.keys(cartExtras).map(category => {
            cartExtras[category].ids.map(id => {
                const existedIndex = detail[category].findIndex(item => item.id === id)
                if (existedIndex === -1) detail[category].push({
                    id: id,
                    number: cartExtras[category].entities[id].number
                })
                else {
                    detail[category][existedIndex].number += cartExtras[category].entities[id].number
                }
            })
        })
        detail['pizza'] = orderedPizzas;
        const fullAddress = inPlace ? "Đặt tại quán" : address + ',' + province
        const order = {
            "customer": customer,
            "phone": phone,
            "address": fullAddress,
            "status": 'Pending',
            "time": time,
            "total payment": totalValue,
            "shipping payment": shipment,
            "detail": detail
        }
        return order
    }
    const postOrder = async () => {
        const order = makeOrder()
        console.log('order',order)
        try {
            const result = await axios.post(
                'https://pizzahust-c5035-default-rtdb.firebaseio.com/order.json',
                order
            )
            if (result && result.status === 200) {
                console.log(result)
                setMessage('Thêm món thành công')
                dispatch(addOrder({id: result.data.name, data: order}))
            } else setMessage('Có lỗi xảy ra!')
            setPosted(true)
        } catch (err) {
            setMessage('Có lỗi xảy ra!')
            setPosted(true)
        }
    }
    return (
        <Container>
            <Header/>
            <BackgroundMenu>YOUR CART</BackgroundMenu>
            {totalValue > 1 ?
                <ContentContainer>
                <YourCart
                        handleCartChange={handleCartChange}
                        handleComboChange={handleComboChange}
                        handleExtraChange={handleExtraChange}
                    />
                    <br/>
                    <br/>
                    <span
                                style={{
                                    fontWeight: 700,
                                    fontSize: '32px',
                                    color: '#07143B',
                                    textAlign: 'start'
                                }}
                    >Tổng tiền: {totalValue} VND
                    </span>
                    <ConfirmOrder
                        disabled={totalValue < 0.01}
                        onClick={()=>{
                        SetPay(true)}
                        }
                    >
                        <TextConfirm>TIẾN HÀNH ĐẶT HÀNG</TextConfirm>
                    </ConfirmOrder>
                    <Modal open={pay} onClose={() => {
                        SetPay(false)
                    }}>
                        <Fade in={pay} timeout={500}>
                            <Stack
                                spacing={1}
                                sx={{
                                    borderRadius: '24px',
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    p: 4,
                                    boxShadow: 24,
                                    width: '500px'
                                }}
                            >
                                <span variant="h6"
                                            sx={{
                                                fontFamily: 'Playfair Display',
                                                fontWeight: 700,
                                                fontSize: '20px',
                                                lineHeight: '52px',
                                                color: '#07143B',
                                                textAlign: 'center',
                                            }}
                                > Vui lòng điền đơn này
                                </span>
                                <TextField
                                    required
                                    id="name-field"
                                    label="Tên"
                                    value={customer}
                                    onChange={(e) => {
                                        setCustomer(e.target.value)
                                    }}
                                    multiline
                                    maxRows={1}
                                    color='warning'
                                    inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                    InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                />
                                <TextField
                                    required
                                    id="name-field"
                                    label="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}
                                    multiline
                                    type="number"
                                    maxRows={1}
                                    color='warning'
                                    inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                    InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                />
                                <FormControlLabel
                                    label="Đặt tại quán"
                                    control={
                                        <Checkbox
                                            color="warning"
                                            checked={inPlace}
                                            onChange={e => setInPlace(prev => !prev)}
                                        />
                                    }
                                />


                                {!inPlace &&
                                    <Select
                                        label="Province"
                                        value={province}
                                        onChange={(e) => {
                                            setProvince(e.target.value)
                                        }}
                                        inputProps={{style: {fontFamily: 'Josefin Sans'}}}
                                        MenuProps={{style: {fontFamily: 'Josefin Sans'}}}
                                        SelectDisplayProps={{style: {fontFamily: 'Josefin Sans'}}}
                                        color='warning'
                                    >
                                        {
                                            pros.map(pro =>
                                                <MenuItem
                                                    value={pro}
                                                    sx={{
                                                        fontFamily: 'Josefin Sans'
                                                    }}
                                                >
                                                    {pro}
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                }
                                {!inPlace &&
                                    <TextField
                                        required
                                        id="name-field"
                                        label="Địa chỉ chi tiết"
                                        multiline
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value)
                                        }}
                                        maxRows={1}
                                        color='warning'
                                        inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                        InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                    />
                                }

                                <span variant="h6"
                                            sx={{
                                                fontFamily: 'Josefin Sans',
                                                fontWeight: 700,
                                                fontSize: '15px',
                                                lineHeight: '52px',
                                                color: '#07143B',
                                                textAlign: 'start',
                                            }}
                                >Phí ship: {inPlace || province === 'Ha Noi' ? 22000 : 40000}
                                </span>
                                <span variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: '20px',
                                                lineHeight: '52px',
                                                color: '#07143B',
                                                textAlign: 'start',
                                            }}
                                >Tổng đơn: {totalValue + (inPlace || province === 'Ha Noi' ? 22000 : 40000)}
                                </span>
                                <Button variant="contained"
                                        disabled={!validForm()}
                                        onClick={() => {
                                            postOrder()
                                            SetPay(false)
                                        }}
                                        sx={{
                                            backgroundColor: '#ec393e',
                                            borderRadius: '100px',
                                            alignSelf: 'center',
                                            fontWeight: 'normal',
                                            fontSize: '15px',
                                            color: 'white',
                                            '&:hover, &:active': {
                                                backgroundColor: '#ea5054'
                                            },
                                            marginBottom: 2,
                                            width: '150px'
                                        }}
                                >
                                    Đặt hàng
                                </Button>
                            </Stack>
                        </Fade>
                    </Modal>
                    <Snackbar
                        open={posted}
                        onClose={() => {
                            setPosted(false)
                        }}
                        message={message}
                        autoHideDuration={6000}
                    />
                </ContentContainer>
                : <EmptyCart
                    title={'GIỎ HÀNG CỦA BẠN ĐANG TRỐNG'}
                    content={'Hiện tại bạn chưa có sản phẩm nào trong giỏ hàng. ' +
                        'Hãy dạo một vòng Thực đơn ' +
                        'để chọn sản phẩm yêu thích nhé, PizzaHUST có nhiều món ngon lắm!'}
                />}
        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  width: 100%;
  background-color: #F4F1F1;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_YOUR_CART_BACKGROUND});
  justify-content: center;
  font-size: 32px;
  color: white;
`
const ConfirmOrder = styled(Button)`
  width: 320px;
  height: 40px;
  margin: 20px 0;
  background-color: #EC393E;
  border-radius: 12px;
`
const TextConfirm = styled('span')`
  color: white;
  font-size: 20px;
`
const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #F4F1F1;
`