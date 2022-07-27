import {memo} from "react";
import {IMG_PIZZA_ORIGINAL} from "../assets";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ItemInCart = memo(function ItemInCart(props) {
    const name = props.name;
    const image = props.image;
    const number = props.number;
    const price = props.price;
    return (
        <Container>
            <div>
                <Text>{name}</Text>
                <div style={{display: 'flex',justifyContent:'space-between',paddingRight:8}}>
                    <TextBlur>{price} đ</TextBlur>
                    <div style={{marginLeft:12}}>
                        <Text>x{number}</Text>
                    </div>
                </div>
            </div>
            <ImageFood src={image}/>
        </Container>
    )
})
const Container = styled(Box)`
  display: flex;
  width: 90%;
  //border-radius: 20px;
  background-color: rgba(238, 238, 238, 0.5);
  padding-left: 12px;
  justify-content: space-between;
  box-shadow: -6px 6px 8px -3px rgba(84,66,66,0.75);
  -webkit-box-shadow: -6px 6px 8px -3px rgba(84,66,66,0.75);
  -moz-box-shadow: -6px 6px 8px -3px rgba(84,66,66,0.75);
  border-radius: 12px;
`
const ImageFood=styled('img')`
width: 100px;
  height: 100%;
  border-radius: 4px;
`
const Text = styled('p')`
font-size: 12px;
  color: black;
`
const TextBlur=styled(Text)`
  color: #8c8888;
`
