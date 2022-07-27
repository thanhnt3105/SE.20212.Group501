import React,{memo} from "react";
import List from "@mui/material/List";
import {ItemInCart} from "./ItemInCart";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const MyCartSection = memo(function MyCartSection(){
    const categories = {
        'dessert':{
            selector: useSelector(state => state.desserts.entities),
        },
        'drink':{
            selector: useSelector(state => state.drinks.entities),
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables.entities),
        },
        'kid':{
            selector: useSelector(state => state.kids.entities),
        },
        'appetizer':{
            selector: useSelector(state => state.appetizers.entities),
        }
    }
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const pizzas = useSelector(state => state.pizzas.entities);
    const combos = useSelector(state => state.combos.entities);
    const navigate = useNavigate();
    const emptyCart = () =>{
        if (cart.ids.length > 0) return false;
        if (cartCombos.ids.length > 0) return false;
        const cates = Object.keys(categories)
        for(let i = 0; i< cates.length ;i++){
            if(cartExtras[cates[i]].ids.length > 0) return false;
        }
        return true;
    }
    return (
        <MyCart>
            <HeaderBottom>GIỎ HÀNG CỦA TÔI</HeaderBottom>
            <List
                sx={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 600,
                    '& ul': {padding: 0},
                }}>
                {
                    cart.ids && cart.ids.map(id => {
                        const cartInfo = cart.entities[id]
                        const pizza = pizzas[cartInfo.pizzaId]
                        return pizza && cartInfo && (
                            <SListItem>
                                <ItemInCart
                                    image={pizza.image_url}
                                    name={pizza.title}
                                    number={cartInfo.number}
                                    price={cartInfo.total}
                                />
                            </SListItem>
                        )
                    })
                }

                {
                    Object.keys(categories).map(category =>
                        cartExtras[category] && cartExtras[category].ids && cartExtras[category].ids.length > 0 &&

                        cartExtras[category].ids.map((itemId) =>{
                            const extra = categories[category].selector[itemId]
                            const cartInfo = cartExtras[category].entities[itemId]
                            return extra && cartInfo && (
                                <SListItem>
                                    <ItemInCart
                                        image = {extra.image_url}
                                        name = {extra.title}
                                        number = {cartInfo.number}
                                        price = {cartInfo.total}
                                    />
                                </SListItem>

                            )
                        })
                    )}

                {
                    cartCombos.ids && cartCombos.ids.map(id =>{
                        const cartInfo = cartCombos.entities[id]
                        const comboId = cartInfo.comboId;
                        const combo = combos[comboId];
                        return combo && cartInfo && (
                            <SListItem>
                                <ItemInCart
                                    image={combo.image}
                                    name={combo.title}
                                    number={cartInfo.number}
                                    price={cartInfo.total}
                                />
                            </SListItem>
                        )
                    })
                }
            </List>
            {
                emptyCart()
                &&
                <Box sx = {{
                    marginTop: '30px'
                }}>
                    <div>Giỏ hàng đang rỗng
                    </div>
                </Box>
            }
            <ButtonCheckCart
                onClick={()=>{navigate('/cart')}}
            >
                <TextCheckCart>KIỂM TRA GIỎ HÀNG</TextCheckCart>
            </ButtonCheckCart>
        </MyCart>
    )
})

const MyCart = styled(Box)`
  width: 30%;
  background-color: white;
  border-radius: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  height: 600px;
  padding-bottom: 20px;
`
const ButtonCheckCart = styled(Button)`
  width: 60%;
  height: 36px;
  border-radius: 12px;
  background-color: #EC393E;
  margin-top: 12px;
`
const TextCheckCart = styled('span')`
  color: #ffff;
  font-size: 12px;
`
const SListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: center;
`
const HeaderBottom = styled('div')`
  color: black;
  width: 80%;
  font-size: 20px;
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #655D5d;
  display: flex;
  align-items: center;
  justify-content: center;
`