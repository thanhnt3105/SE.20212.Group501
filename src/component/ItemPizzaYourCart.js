import React, {memo, useCallback, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {IC_DELETE, IC_EDIT} from "../assets";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ModalPizzaSelect} from "./ModalPizzaSelect";

export const ItemPizzaYourCart = memo(function ItemPizzaYourCart(props) {
    const [done,setDone]=useState(false);
    const cartInfo = props.cartInfo
    const cartId = props.cartId
    const pizza = props.pizza
    const handleCartChange = props.handleCartChange;
    const navigate = useNavigate();
    const remove = useCallback(()=>{
        handleCartChange(cartId);
    },[cartId])
    const location = {
        state: {
            id: cartId,
            size: cartInfo.size,
            sole: cartInfo.sole,
            number: cartInfo.number,
            total: cartInfo.total,
            toppings: cartInfo.toppings
        }
    }
    return (
        <Container>
            <ImagePizza src={pizza.image_url}/>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: 12}}>
                <LeftSection>
                    <TextNormal>{pizza.title}</TextNormal>
                    <br/>
                    <br/>
                    <TextNormal style={{marginRight: 12}}>Cỡ: {pizza.size[cartInfo.size].type_detail}</TextNormal>
                    <TextNormal>Đế: {pizza.type[cartInfo.sole]}</TextNormal>
                    <br/>
                    <br/>
                    <RowText>
                        {
                            pizza.topping.map((topping, toppingId)=>{
                                return cartInfo.toppings[toppingId] &&
                                    <TextLight>{topping.topping_name} </TextLight>

                            })
                        }
                    </RowText>
                </LeftSection>
                <RightSection>
                    <div>
                        <TextNormal style={{marginRight: 16}}>{cartInfo.total} đ</TextNormal>
                        <TextNormal>x{cartInfo.number}</TextNormal>
                    </div>
                    <div>
                        <ButtonAction
                            onClick={()=>{
                                setDone(!done)
                            }}
                        >
                            <ImageAction src={IC_EDIT}/>
                        </ButtonAction>
                        <ButtonAction
                            onClick={remove}
                        >
                            <ImageAction src={IC_DELETE}/>
                        </ButtonAction>
                    </div>
                </RightSection>
            </div>
            <ModalPizzaSelect done={done} id={cartInfo.pizzaId} location={location}/>
        </Container>
    )
})
const Container = styled(Box)`
  display: flex;
  background-color: white;
  border-radius: 20px;
  box-shadow: 5px 6px 8px -3px rgba(84, 66, 66, 0.75);
  -webkit-box-shadow: 5px 6px 8px -3px rgba(84, 66, 66, 0.75);
  -moz-box-shadow: 5px 6px 8px -3px rgba(84, 66, 66, 0.75);
  margin: 20px 0;
`
const ImagePizza = styled('img')`
  width: 180px;
  height: 100%;
`
const LeftSection = styled('div')`
  width: 48%;
`

const TextNormal = styled('span')`
  font-size: 16px;
  color: black;
`
const TextLight = styled('span')`
  font-size: 8px;
  color: black;
`
const RowText = styled('div')`
  display: flex;
  background-color: #E2D8D8;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
`

const RightSection = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

`
const ButtonAction = styled(IconButton)`
  background-color: #E2D8D8;
  margin: 0 12px;
`
const ImageAction = styled('img')`
  width: 12px;
  height: 12px;
`