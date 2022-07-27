import React,{memo} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {IMG_CAT_BOX} from "../assets";

export const EmptyCart = memo(function EmptyCart(props){
    return (
        <NoOrderDiv>
            <BoxNoOrder>
                <ImageNoOrder src={IMG_CAT_BOX}/>
                <TextTitle>{props.title}</TextTitle>
                <TextContent>{props.content}</TextContent>
            </BoxNoOrder>
        </NoOrderDiv>
    )
})
const Container =styled(Box)`
margin-top: 48px;
  background-color: #F4F1F1;
`
const NoOrderDiv = styled('div')`
display: flex;
  flex-direction: column;
  align-items: center;
`

const BoxNoOrder = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
background-color: #FFFBFB;
  width: 50%;
  border-radius: 24px;
  margin-top: -12px;
  flex-direction: column;
  padding: 12px;
`
const ImageNoOrder= styled('img')`
width: 60%;
`
const TextTitle=styled('h1')`
font-size: 24px;
  color:#7F7F7F
`
const TextContent = styled('span')`
color: rgba(127, 127, 127, 0.8);
  font-size: 16px;
  align-self: center;
  text-align: center;
`