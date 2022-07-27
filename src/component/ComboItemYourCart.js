import React, {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {IC_DELETE, IC_EDIT, IC_PLUS, IC_SUBTRACT} from "../assets";
import {Collapse, Divider, IconButton} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ComboMiniItem} from "./ComboMiniItem";
import {ModalComboSelect} from "./ModalComboSelect";

const round = (num) => Math.round(num * 100) / 100;

export const ComboItemYourCart = memo(function ComboItemYourCart(props) {
    const cartId = props.cartId;
    const cartInfo = props.cartInfo;
    const combo = useSelector(state => state.combos.entities[cartInfo.comboId])
    const navigate = useNavigate();
    const handleComboChange = props.handleComboChange
    const [expand, setExpand] = useState(false);
    const [done,setDone]=useState(false);
    const categories = {
        'pizza':{
            number: combo.pizza ? combo.pizza : 0, slot: cartInfo.pizzaSlot, selector: useSelector(state => state.pizzas.entities)
        },
        'kid':{
            number: combo.kid ? combo.kid : 0, slot: cartInfo.kidSlot, selector: useSelector(state => state.kids.entities)
        },
        'vegetable':{
            number: combo.vegetable ? combo.vegetable : 0, slot: cartInfo.vegetableSlot, selector: useSelector(state => state.vegetables.entities)
        },
        'appetizer':{
            number: combo.appetizer ? combo.appetizer : 0, slot: cartInfo.appetizerSlot, selector: useSelector(state => state.appetizers.entities)
        },
        'dessert':{
            number: combo.dessert ? combo.dessert : 0, slot: cartInfo.dessertSlot, selector: useSelector(state => state.desserts.entities)
        },
        'drink':{
            number: combo.drink ? combo.drink : 0, slot: cartInfo.drinkSlot, selector: useSelector(state => state.drinks.entities)
        },
    }
    if(combo.free){
        categories['pizza'].number += combo.free.pizza ? combo.free.pizza : 0;
        categories['kid'].number += combo.free.kid ? combo.free.kid : 0;
        categories['vegetable'].number += combo.free.vegetable ? combo.free.vegetable : 0;
        categories['appetizer'].number += combo.free.appetizer ? combo.free.appetizer : 0;
        categories['dessert'].number += combo.free.dessert ? combo.free.dessert : 0;
        categories['drink'].number += combo.free.drink ? combo.free.drink : 0;
    }
    const location = {
        state: {
            cartId: cartId,
            cartInfo: cartInfo
        }
    }
    return (
        <Container>
            <ImagePizza src={combo.image}/>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: 12}}>
                <LeftSection>
                    <TextNormal>{combo.title}</TextNormal>
                    <br/>
                    <br/>
                    <TextBold>Số lượng: </TextBold>
                    <RowSection style={{
                        backgroundColor: 'rgba(222,217,217,0.5)',
                        borderRadius: 16,
                        width: 80,
                        justifyContent: 'space-between',
                        padding: 4,
                        marginRight: 12
                    }}>
                        <ButtonAddPlus src={IC_SUBTRACT}/>
                        <TextNormal> {cartInfo.number}</TextNormal>
                        <ButtonAddPlus src={IC_PLUS}/>
                    </RowSection>
                </LeftSection>
                <RightSection>
                    <div>
                        <TextNormal style={{marginRight: 16}}>{cartInfo.total} đ</TextNormal>
                        <TextNormal>{combo.off > 0 ? combo.off + " %Off" : "Bonus"}</TextNormal>
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
                            onClick={() =>{
                                handleComboChange(cartId)
                            }}
                        >
                            <ImageAction src={IC_DELETE}/>
                        </ButtonAction>
                        <Collapse
                            in={expand}
                        >
                            <Divider sx ={{
                                margin: '0 20px'
                            }}/>
                            <Box
                                sx={{
                                    //backgroundColor : 'rgba(252, 237, 227, 0.3)',
                                    width: '100%',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    p: 3
                                }}
                            >
                                {
                                    Object.values(categories).map(category =>{
                                        if(!category.number) return false
                                        const range = []
                                        for(let i = 0; i < category.number;i++)range.push(i)
                                        return range.map(i =>{
                                            const productId = category.slot[i].productId
                                            return productId && category.selector[productId] && <ComboMiniItem
                                                image = {category.selector[productId].image_url}
                                                title = {category.selector[productId].title}/>
                                        })
                                    })
                                }
                            </Box>
                        </Collapse>
                    </div>
                </RightSection>
            </div>
            <ModalComboSelect id={cartInfo.comboId} location={location} done={done}/>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`

const TextNormal = styled('span')`
  font-size: 16px;
  color: black;
`
const TextBold = styled('span')`
  font-size: 16px;
  color: black;
  font-weight: 600;
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
const ButtonAddPlus = styled('img')`
  width: 16px;
  height: 16px;
`
const ImageAction = styled('img')`
  width: 12px;
  height: 12px;
`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
`
