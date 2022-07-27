import React, {memo, useCallback, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Fade, Modal, span, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {IC_PLUS, IC_SUBTRACT, IMG_SALE_50_PERCENT} from "../assets";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {CustomProduct} from "./CustomProduct";
import {itemAdded, itemUpdated} from '../store/cartComboSlice'
import Stack from "@mui/material/Stack";


const round = (num) => Math.round(num * 100) / 100;

export const ModalComboSelect = memo(function ModalComboSelect(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const location = props.location || {}
    const cartId = location.state ? location.state.cartId : -1;
    const cartInfo = location.state ? location.state.cartInfo : {};
    const comboId = props.id;
    const combo = useSelector(state => state.combos.entities[comboId]);
    const timeStart = moment(combo.start).format('DD/MM/YYYY');
    const timeEnd = moment(combo.end).format('DD/MM/YYYY');
    const [kidSlot, setKidSlot] = useState(cartId >= 0 ? cartInfo.kidSlot : {})
    const [drinkSlot, setDrinkSlot] = useState(cartId >= 0 ? cartInfo.drinkSlot : {})
    const [vegetableSlot, setVegetableSlot] = useState(cartId >= 0 ? cartInfo.vegetableSlot : {})
    const [appetizerSlot, setAppetizerSlot] = useState(cartId >= 0 ? cartInfo.appetizerSlot : {})
    const [dessertSlot, setDessertSlot] = useState(cartId >= 0 ? cartInfo.dessertSlot : {})
    const [pizzaSlot, setPizzaSlot] = useState(cartId >= 0 ? cartInfo.pizzaSlot : {})
    const extras = [
        {category: 'kid', number: combo.kid, slot: kidSlot, setSlot: setKidSlot},
        {category: 'drink', number: combo.drink, slot: drinkSlot, setSlot: setDrinkSlot},
        {category: 'vegetable', number: combo.vegetable, slot: vegetableSlot, setSlot: setVegetableSlot},
        {category: 'appetizer', number: combo.appetizer, slot: appetizerSlot, setSlot: setAppetizerSlot},
        {category: 'dessert', number: combo.dessert, slot: dessertSlot, setSlot: setDessertSlot},
    ]
    let proNum = combo.pizza;
    extras.map(extra => proNum += extra.number ? extra.number : 0)
    if (combo.free) {
        extras[0].freeNumber = combo.free.kid ? combo.free.kid : 0;
        extras[1].freeNumber = combo.free.drink ? combo.free.drink : 0;
        extras[2].freeNumber = combo.free.vegetable ? combo.free.vegetable : 0;
        extras[3].freeNumber = combo.free.appetizer ? combo.free.appetizer : 0;
        extras[4].freeNumber = combo.free.dessert ? combo.free.dessert : 0;
        proNum += combo.free.pizza ? combo.free.pizza : 0;
        extras.map(extra => proNum += extra.freeNumber)
    }

    const initTotal = cartId >= 0 ? round((cartInfo.total * 100 / (100 - combo.off)) / cartInfo.number) : 0
    const [total, setTotal] = useState(initTotal);
    const [num, setNum] = useState(cartId >= 0 ? cartInfo.number : 1);
    const [filled, setFilled] = useState(cartId >= 0 ? proNum : 0);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const valid = Date.now() / 1000 >= combo.start && Date.now() / 1000 <= combo.end

    useEffect(() => {
        setModalVisible(props.done)
    }, [props.done])

    const toggleModal = useCallback(() => {
        setModalVisible(false)
    }, [isModalVisible, props.done])

    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);
    return (
        <Modal
            open={isModalVisible}
            onClose={(_, reason) => {
                if (reason == "backdropClick") {
                    toggleModal();
                }
            }}
            sx={{overflowY: 'auto',}}
        >
            <Container>
                <BoxContainer>
                    <ImageCombo src={combo.banner}/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        borderBottom: '1px solid black',
                        fontSize: 12,
                        color: "#5B5959FF",
                        marginTop: 8
                    }}>
                        {combo.title}
                    </div>
                    <br/>
                    <InfoContainer>
                        <ImageItem src={combo.image}/>
                        <RightSection>
                            <InfoContent>
                                <TextPrice>{combo.subtitle}</TextPrice>
                                <br/>
                                <br/>
                                <TextNormal>{combo.description}</TextNormal>
                                <br/>
                                <br/>
                                <TextLight>Combo dành cho: {combo.persons} người</TextLight>
                                <br/>
                                <TextLight>Thời gian: {timeStart - timeEnd}</TextLight>
                            </InfoContent>
                        </RightSection>
                    </InfoContainer>
                </BoxContainer>
                <br/>
                <SelectFoodContainer>
                    {
                        (combo.pizza && combo.pizza > 0) &&
                        <CustomProduct
                            category="pizza" number={combo.pizza}
                            slot={pizzaSlot}
                            handleAdd={(slotId, productId, price) => {
                                setPizzaSlot(prev => {
                                    let New = {...prev}
                                    if (!prev[slotId]) setFilled(prev => prev + 1)
                                    const currentPrice = prev[slotId] && prev[slotId].pizzaInfo && prev[slotId].pizzaInfo.price ?
                                        prev[slotId].pizzaInfo.price : 0;
                                    setTotal(prev => prev - currentPrice + price)
                                    delete New[slotId]
                                    New[slotId] = {
                                        productId: productId, pizzaInfo: {
                                            price: price,
                                            size: 0,
                                            type: 0,
                                            topping: {}
                                        }
                                    }
                                    return New
                                })
                            }}
                            handleChange={(slotId, newPizza) => {
                                setPizzaSlot(prev => {
                                    let New = {...prev}
                                    const currentPrice = prev[slotId] && prev[slotId].pizzaInfo && prev[slotId].pizzaInfo.price ?
                                        prev[slotId].pizzaInfo.price : 0;
                                    setTotal(prev => prev - currentPrice + newPizza.pizzaInfo.price)
                                    New[slotId] = newPizza
                                    return New
                                })
                            }}
                        />
                    }
                    {
                        extras.map(extra => {
                            return extra.number && extra.number > 0 &&
                                <CustomProduct
                                    number={extra.number} category={extra.category} slot={extra.slot}
                                    handleAdd={(slotId, productId, price) => {
                                        extra.setSlot(prev => {
                                            let New = {...prev}
                                            if (!prev[slotId]) setFilled(prev => prev + 1)
                                            const currentPrice = prev[slotId] && prev[slotId].price ?
                                                prev[slotId].price : 0;
                                            setTotal(prev => prev - currentPrice + price)
                                            New[slotId] = {productId: productId, price: price}
                                            return New
                                        })
                                    }}
                                />
                        })
                    }
                    {
                        combo.free &&
                        <Box sx={{
                            width: '100%'
                        }}>
                            <span variant="subtitle1"
                                        sx={{
                                            fontFamily: 'Fairplay Display',
                                            fontWeight: 600,
                                            fontSize: '35px',
                                            lineHeight: '175%',
                                            color: '#07143B',
                                            textAlign: 'start',
                                            marginBottom: '10px',
                                            m: 3
                                        }}
                            >Bonus (100% miễn phí)
                            </span>
                            {
                                combo.free.pizza && combo.free.pizza > 0 &&
                                <CustomProduct
                                    category="pizza" number={combo.free.pizza}
                                    slot={pizzaSlot}
                                    offset={combo.pizza}
                                    handleAdd={(slotId, productId, price) => {
                                        setPizzaSlot(prev => {
                                            let New = {...prev}
                                            if (!prev[slotId]) setFilled(prev => prev + 1)
                                            delete New[slotId]
                                            New[slotId] = {
                                                productId: productId, pizzaInfo: {
                                                    price: 0,
                                                    size: 0,
                                                    type: 0,
                                                    topping: {}
                                                }
                                            }
                                            return New
                                        })
                                    }}
                                    handleChange={(slotId, newPizza) => {
                                        setPizzaSlot(prev => {
                                            let New = {...prev}
                                            New[slotId] = newPizza
                                            return New
                                        })
                                    }}
                                />
                            }
                            {
                                extras.map(extra => {
                                    return extra.freeNumber && extra.freeNumber > 0 &&
                                        <CustomProduct
                                            number={extra.freeNumber} category={extra.category} slot={extra.slot}
                                            offset={extra.number}
                                            handleAdd={(slotId, productId, price) => {
                                                extra.setSlot(prev => {
                                                    let New = {...prev}
                                                    if (!prev[slotId]) setFilled(prev => prev + 1)
                                                    New[slotId] = {productId: productId, price: 0}
                                                    return New
                                                })
                                            }}
                                        />
                                })
                            }
                        </Box>
                    }

                    <RowSection style={{justifyContent: 'space-between', marginTop: 20}}>
                        <TextNormal>Tổng đơn: {round(total * num * (100 - combo.off) / 100)} đ</TextNormal>
                        {
                            combo.off > 0 &&
                            <Typography variant="h6"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '20px',
                                            color: '#EC393E',
                                            textAlign: 'center',
                                            textOverflow: 'ellipsis',
                                            textDecoration: 'line-through'
                                        }}
                            >({round(total * num)} vnd)
                            </Typography>
                        }
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <RowSection style={{
                                backgroundColor: 'rgba(222,217,217,0.5)',
                                borderRadius: 16,
                                width: 80,
                                justifyContent: 'space-between',
                                padding: 4,
                                marginRight: 12
                            }}>
                                <ButtonAction
                                    onClick={() => {
                                        setNum(prev => (prev === 1) ? 1 : prev - 1)
                                    }}
                                    src={IC_SUBTRACT}/>
                                <TextNormal>{num}</TextNormal>
                                <ButtonAction
                                    onClick={() => {
                                        setNum(prev => (prev === 10) ? 10 : prev + 1)
                                    }}

                                    src={IC_PLUS}/>
                            </RowSection>
                            <AddToCart
                                disabled={filled < proNum}
                                onClick={() => {
                                    if (cartId >= 0) {
                                        dispatch(itemUpdated({
                                            id: cartId,
                                            data: {
                                                comboId: comboId,
                                                pizzaSlot: pizzaSlot,
                                                kidSlot: kidSlot,
                                                vegetableSlot: vegetableSlot,
                                                appetizerSlot: appetizerSlot,
                                                dessertSlot: dessertSlot,
                                                drinkSlot: drinkSlot,
                                                number: num,
                                                total: round(total * num * (100 - combo.off) / 100)
                                            }
                                        }))
                                    } else dispatch(itemAdded({
                                        comboId: comboId,
                                        pizzaSlot: pizzaSlot,
                                        kidSlot: kidSlot,
                                        vegetableSlot: vegetableSlot,
                                        appetizerSlot: appetizerSlot,
                                        dessertSlot: dessertSlot,
                                        drinkSlot: drinkSlot,
                                        number: num,
                                        total: round(total * num * (100 - combo.off) / 100)
                                    }))
                                    setDone(true)
                                }}
                            >
                                <TextAdd>{cartId >= 0 ? "CẬP NHẬT GIỎ HÀNG" : "THÊM VÀO GIỎ HÀNG"}</TextAdd>
                            </AddToCart>
                        </div>
                    </RowSection>
                </SelectFoodContainer>
                <Modal open={done} >
                    <Fade in={done} timeout={500}>
                        <StackModalAddCart
                            spacing={3}
                            sx={{p: 5}}
                        >
                            <TextAddCart>Đã cập nhật giỏ hàng của bạn</TextAddCart>
                            <Stack direction="row" spacing={5}>
                                <ButtonModalAddToCart variant="contained"
                                        onClick = {()=>{
                                            setDone(false);
                                        }}
                                >
                                    Xong
                                </ButtonModalAddToCart>
                                <ButtonModalAddToCart variant="contained"
                                        onClick = {()=>{
                                            navigate('/cart');
                                        }}
                                >
                                    Xem giỏ hàng
                                </ButtonModalAddToCart>
                            </Stack>

                        </StackModalAddCart>
                    </Fade>
                </Modal>
            </Container>
        </Modal>
    )
})
const Container = styled('div')`
  position: absolute;
  outline: none;
  display: flex;
  flex-direction: column;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`
const BoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #F4F1F1;
  border-radius: 24px;
  padding: 16px;
`

const ImageCombo = styled('img')`
  width: 100%;
  height: 100%;
`
const InfoContainer = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
const ImageItem = styled('img')`
  width: 200px;
  height: 200px;
`
const ImageSaleOff = styled('img')`
  width: 60px;
  height: 60px;
`
const RightSection = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 12px;

`
const InfoContent = styled('div')`

`
const SelectFoodContainer = styled(BoxContainer)`

`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
`

const ImageFood = styled('img')`
  width: 160px;
  height: 120px;
`
const ButtonChangeFood = styled(Button)`
  background-color: #EC393E;
  width: 160px;
  height: 32px;
  border-radius: 24px;
`
const ConfirmOrder = styled(Button)`
  width: 240px;
  height: 32px;
  margin: 20px 0;
  background-color: #EC393E;
  border-radius: 12px;
`
const ButtonAction = styled('img')`
  width: 16px;
  height: 16px;
`
const TextConfirm = styled('span')`
  color: white;
  font-size: 12px;
`
const TextHeading = styled('span')`
  font-size: 20px;
  color: black;
`
const TextNormal = styled('span')`
  font-size: 16px;
  color: black;
  padding: 4px 0;
`
const TextLight = styled('span')`
  font-size: 12px;
  color: #5B5959FF;
`
const TextAdd = styled('span')`
  color: white;
  font-size: 12px;
`
const TextPrice = styled('span')`
  color: #fc2255;
  font-size: 20px;
`

const AddFood = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #fc2255;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background-color: #FFFBFB;
`
const AddRedButton = styled('img')`
  width: 24px;
  height: 24px;
`
const AddToCart = styled(Button)`
  height: 32px;
  background-color: #E2D8D8;
  border-radius: 12px;
`
const StackModalAddCart =styled(Stack)`
  background-color: white;
  border-radius: 24px;
  width: 500px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  align-items: center;
`
const TextAddCart = styled('span')`
  font-size: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`
const ButtonModalAddToCart = styled(Button)({
    backgroundColor: '#EC393E',
    borderRadius: '100px',
    //maxWidth: '150px',
    fontSize: '15px',
    lineHeight: '175%',
    color: 'white',
    height: '45px',
    '&:hover, &:active': {
        backgroundColor: '#EA4D52FF'
    },
    marginBottom: 2
})