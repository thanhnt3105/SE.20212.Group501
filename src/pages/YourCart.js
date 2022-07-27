import {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ItemPizzaYourCart} from "../component/ItemPizzaYourCart";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import {useSelector} from "react-redux";
import {ExtraItemYourCart} from "../component/ExtraItemYourCart";
import {ComboItemYourCart} from "../component/ComboItemYourCart";

const round = (num) => Math.round(num * 100) / 100;

export const YourCart = memo(function YourCart(props) {
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const allPizzas = useSelector(state => state.pizzas.entities);
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
    const [totalValue, SetTotalValue] = useState(round(totalPizza + totalExtra + totalCombo));


    const categories = {
        'dessert':{
            selector: useSelector(state => state.desserts),
        },
        'drink':{
            selector: useSelector(state => state.drinks),
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables),
        },
        'kid':{
            selector: useSelector(state => state.kids),
        },
        'appetizer':{
            selector: useSelector(state => state.appetizers),
        }
    }

    return (
            <ContentContainer>
                {/*<ModalComboSelect/>*/}
                <CartContainer>
                    {
                        cart.ids.length > 0 &&
                        <Box sx = {{width: '100%'}}>
                            <HeaderBottom>Pizzas</HeaderBottom>
                            <List sx={{
                                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                                borderRadius: '10px', p: 3
                            }}>
                                {
                                    cart.ids.map((itemId,index) =>{
                                        const cartInfo = cart.entities[itemId]
                                        const pizza = allPizzas[cart.entities[itemId].pizzaId]
                                        return cartInfo && pizza &&(
                                            <ListItem key={index}>
                                                <ItemPizzaYourCart
                                                    cartInfo = {cartInfo}
                                                    pizza = {pizza}
                                                    cartId = {itemId}
                                                    handleCartChange = {props.handleCartChange}
                                                />
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    }
                    {
                        Object.keys(categories).map((category,index) =>
                            cartExtras[category].ids.length > 0 &&
                            <Box sx={{width: '100%'}} key={index}>
                                <HeaderBottom>{category.replace(/^\w/, (c) => c.toUpperCase())}s
                                </HeaderBottom>
                                <List sx={{
                                    backgroundColor: 'rgba(252, 237, 227, 0.3)',
                                    borderRadius: '10px', p: 3
                                }}>
                                    {
                                        cartExtras[category].ids.map((itemId,index) =>{
                                            const cartItem = cartExtras[category].entities[itemId]
                                            const extra = categories[cartItem.category].selector.entities[itemId]
                                            return extra && cartItem && (
                                                <ListItem key={index}>
                                                    <ExtraItemYourCart
                                                        category = {category}
                                                        extra = {extra}
                                                        number={cartItem.number}
                                                        handleClick = {props.handleExtraChange}
                                                        extraId={itemId}
                                                    />
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Box>
                        )}
                    {
                        cartCombos.ids.length > 0 &&
                        <Box sx={{width: '100%'}}>
                            <HeaderBottom>Combos</HeaderBottom>
                            <List sx={{
                                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                                borderRadius: '10px',
                                p: 3
                            }}>
                                {
                                    cartCombos.ids.map((cartId,index) =>{
                                        return(
                                            <ListItem key={index}>
                                                <ComboItemYourCart cartId = {cartId} cartInfo = {cartCombos.entities[cartId]} handleComboChange = {props.handleComboChange}/>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    }
                </CartContainer>
            </ContentContainer>
    )
})

const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #F4F1F1;
`
const CartContainer = styled(Box)`
  background-color: #FFFBFB;
  padding: 20px 36px;
  border-radius: 12px;
  margin-top: -12px;

`
const HeaderBottom = styled('div')`
  color: black;
  width: 100%;
  font-size: 20px;
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #655D5d;
  display: flex;
  align-items: center;
  justify-content: center;
`
const HeaderTop = styled(HeaderBottom)`
  border-top: 2px solid #655D5d;
  border-bottom: 0;
  padding-top: 12px;
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