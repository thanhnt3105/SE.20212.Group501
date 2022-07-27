import React, {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {IC_DELETE, IC_EDIT, IC_PLUS, IC_SUBTRACT} from "../assets";
import {IconButton} from "@mui/material";

const round = (num) => Math.round(num * 100) / 100;

export const ExtraItemYourCart = memo(function ExtraItemYourCart(props) {
    const name = props.extra.title;
    const image = props.extra.image_url;
    const price = props.extra.price;
    const extraId = props.extraId;
    const handleClick = props.handleClick;
    const category = props.category;
    const [num, SetNum] = useState(props.number ? props.number : 1);
    return (
        <Container>
            <ImagePizza src={image}/>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: 12}}>
                <LeftSection>
                    <TextNormal>{name}</TextNormal>
                    <br/>
                    <br/>
                    <TextBold>Số lượng:</TextBold>
                    <RowSection style={{
                           backgroundColor: 'rgba(222,217,217,0.5)',
                           borderRadius: 16,
                           width: 80,
                           justifyContent: 'space-between',
                           padding: 4,
                           marginRight: 12
                       }}>
                           <ButtonAddPlus
                               onClick = {()=>{
                                   const newNum = (num === 1)? 1: num - 1;
                                   if(num > 1)
                                       handleClick(category, extraId, false, false, price, {
                                           number: newNum,
                                           total: round(newNum * price)
                                       });
                                   SetNum(newNum);
                               }}
                               src={IC_SUBTRACT}/>
                           <TextNormal>{num}</TextNormal>
                           <ButtonAddPlus
                               onClick = {()=>{
                                   const newNum = (num === 10) ? 10: num + 1;
                                   if(num < 10)
                                       handleClick(category, extraId, false, true, price, {
                                           number: newNum,
                                           total: round(newNum * price)
                                       });
                                   SetNum(newNum);
                               }}
                               src={IC_PLUS}/>
                       </RowSection>
                </LeftSection>
                <RightSection>
                    <div>
                        <TextNormal style={{marginRight: 16}}>{`${round(num * price)} đ`}</TextNormal>
                    </div>
                    <div>
                        <ButtonAction
                            onClick={() =>{
                                handleClick(category, extraId, true, false, num*price);
                            }}
                        >
                            <ImageAction src={IC_DELETE}/>
                        </ButtonAction>
                    </div>
                </RightSection>
            </div>
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
