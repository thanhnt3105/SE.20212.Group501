import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {IC_BACK_NO_BORDER, IC_NEXT_NO_BORDER, IMG_PIZZA_YOUR_CART} from "../assets";
import Stack from "@mui/material/Stack";
import {Checkbox} from "@mui/material";

export const AddedPizza = (props) => {
    const slotId = props.slotId;
    const openModal = props.openModal;
    const productId = props.productId;
    const pizzaInfo = props.pizzaInfo;
    const handleChange = props.handleChange;
    const product = useSelector(state => state.pizzas.entities[productId]);
    return (
        <Container>
            <RowSection>
                <ColumnSection >
                    <ImageView src={product.image_url}/>
                    <ChangeItem
                        onClick={() =>{
                            openModal(slotId)
                        }}
                    >
                        <TextChangeItem>ĐỔI MÓN</TextChangeItem>
                    </ChangeItem>
                </ColumnSection>
                <div style={{width:'58%',padding:8}}>
                    <RowSection style={{justifyContent:'space-between'}}>
                        <TextNormal>{product.title}</TextNormal>
                        <TextNormal>{pizzaInfo.price} đ</TextNormal>
                    </RowSection>
                    <br/>
                    <RowSection style={{justifyContent:'space-between'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <TextNormal>Cỡ:</TextNormal>
                            <ImageAction
                                onClick = {() =>{
                                    const currentSize = pizzaInfo.size ? pizzaInfo.size : 0
                                    const newSize = currentSize > 0 ? currentSize - 1: 0
                                    const currentPrice = pizzaInfo.price;
                                    const newPrice = currentPrice - product.size[currentSize].type_price + product.size[newSize].type_price
                                    handleChange(slotId, {
                                        productId: productId,
                                        pizzaInfo:{
                                            ...pizzaInfo,
                                            size: newSize,
                                            price: newPrice
                                        }
                                    })
                                }}
                                src={IC_BACK_NO_BORDER}/>
                            <TextNormal>{product.size[pizzaInfo.size ? pizzaInfo.size: 0].type_detail}</TextNormal>
                            <ImageAction
                                onClick = {() =>{
                                    const currentSize = pizzaInfo.size ? pizzaInfo.size : 0
                                    const newSize = currentSize < product.size.length - 1 ? currentSize + 1: currentSize
                                    const currentPrice = pizzaInfo.price;
                                    const newPrice = currentPrice - product.size[currentSize].type_price + product.size[newSize].type_price
                                    handleChange(slotId, {
                                        productId: productId,
                                        pizzaInfo:{
                                            ...pizzaInfo,
                                            size: newSize,
                                            price: newPrice
                                        }
                                    })
                                }}
                                src={IC_NEXT_NO_BORDER}/>
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <TextNormal>Đế:</TextNormal>
                            <ImageAction
                                onClick = {() =>{
                                    const currentType = pizzaInfo.type ? pizzaInfo.type : 0
                                    const newType = 1 - currentType
                                    handleChange(slotId, {
                                        productId: productId,
                                        pizzaInfo:{
                                            ...pizzaInfo,
                                            type: newType,
                                        }
                                    })
                                }}
                                src={IC_BACK_NO_BORDER}/>
                            <TextNormal>{product.type[pizzaInfo.type ? pizzaInfo.type: 0].slice(0, 10)}</TextNormal>
                            <ImageAction
                                onClick = {() =>{
                                    const currentType = pizzaInfo.type ? pizzaInfo.type : 0
                                    const newType = 1 - currentType
                                    handleChange(slotId, {
                                        productId: productId,
                                        pizzaInfo:{
                                            ...pizzaInfo,
                                            type: newType,
                                        }
                                    })
                                }}
                                src={IC_NEXT_NO_BORDER}/>
                        </div>
                    </RowSection>
                    <br/>
                    <TextNormal>Toppings</TextNormal>
                    <br/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        {
                            product.topping.map((top, index) =>
                                <Stack direction='row' spacing={2} sx={{width: {md: '70%', sm: '100%', xs: '100%'}, alignItems: 'center'}}>
                                    <Checkbox
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EC393E',
                                            },
                                        }}
                                        checked = {pizzaInfo.topping ? pizzaInfo.topping[index] : false}
                                        onChange={() =>{
                                            const currentTopping = pizzaInfo.topping ? pizzaInfo.topping : {}
                                            const newTopping = {
                                                ...currentTopping
                                            }
                                            newTopping[index] = currentTopping[index] === true? false : true
                                            const currentPrice = pizzaInfo.price;
                                            const newPrice = newTopping[index] ? currentPrice + top.topping_price : currentPrice - top.topping_price
                                            handleChange(slotId, {
                                                productId: productId,
                                                pizzaInfo:{
                                                    ...pizzaInfo,
                                                    topping: newTopping,
                                                    price: newPrice
                                                }
                                            })
                                        }}
                                    />
                                    <span
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: '15px',
                                                    lineHeight: '22.75px',
                                                    color: '#07143B',
                                                }}
                                    >{top.topping_name} - {top.topping_price}đ
                                    </span>
                                </Stack>
                            )
                        }
                    </Box>
                </div>
            </RowSection>
        </Container>
    )
}
const Container = styled(Box)`
  background-color: white;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 20px;
`
const RowSection = styled('div')`
  display: flex;
`
const TextNormal = styled('span')`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
`
const TextLight = styled('span')`
  font-size: 12px;
  color: #2c2b2b;
`
const ImageView = styled('img')`
  width: 120px;
`
const ChangeItem = styled(Button)`
  background-color: #ec393e;
  width: 120px;
  height: 28px;
  margin-top: 4px;

`
const TextChangeItem = styled('span')`
  font-size: 12px;
  color: white;
`
const ImageAction = styled('img')`
  width: 20px;
  height: 20px;
`
const ColumnSection =styled('div')`
display: flex;
  flex-direction: column;
  justify-content: center;
`