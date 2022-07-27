import React, {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {ModalPizzaSelect} from "./ModalPizzaSelect";
import {ModalExtraItemSelect} from "./ModalExtraItemSelect";


export const BestTrendingItem = memo(function BestTrendingItem(props) {
    const navigate = useNavigate();
    const [done,setDone]=useState(false);
    const order = props.order;
    const category = props.category;
    const [hov, setHov] = useState(false);
    const switchHov = () => {
        setHov(prev => !prev);
    }
    return (
        <Container>
            <ImageFood src={order.image_url}/>
            <ContentContainer>
                <TextItem>{order.title} </TextItem>
                <RateView>
                    <PriceAndStar>
                        <NumberOfCustomer>{order.order_number} người đã gọi</NumberOfCustomer>
                        <PriceText>{order.price} đ</PriceText>
                    </PriceAndStar>
                    <AddButton
                        onClick={()=>{
                            setDone(!done)
                        }}
                    >
                        <AddText>THÊM</AddText>
                    </AddButton>
                </RateView>
            </ContentContainer>
            {
                category === 'pizza' ?        <ModalPizzaSelect done={done} id={props.id}/>
: <ModalExtraItemSelect done={done} id={props.id} category={category}/>
            }        </Container>
    )
})
const Container = styled(Box)`
  display: flex;
  background-color: #FFF9F9;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 10px 10px 5px -7px rgba(0, 0, 0, 0.5);
  height: 320px;
  width: 200px;
`
const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  background-color: #FFF9F9;
`
const ImageFood = styled('img')`
  width: 200px;
  height: 200px;
`
const TextItem = styled('p')`
  color: black;
  font-weight: 600;
`

const RateView = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const PriceAndStar = styled(Box)`
  display: flex;
  flex-direction: column;
`
const AddButton = styled(Button)({
    width: 32,
    height: 28,
    backgroundColor: '#E2D8D8',
    borderRadius: 12,
    '&:hover': {
        backgroundColor: '#EC393E'
    }
})

const AddText = styled('p')`
  font-size: 12px;
  color: white;
`
const PriceText = styled(AddText)`
  color: #333;
  font-weight: 600;
`
const NumberOfCustomer = styled('span')`
  font-size: 12px;
  color: #afa8a8;
`
