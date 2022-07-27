import React, {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Rating} from "@mui/material";
import {ModalPizzaSelect} from "./ModalPizzaSelect";
import {ModalExtraItemSelect} from "./ModalExtraItemSelect";


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});


export const ExtraItemInMenu = memo(function ExtraItemInMenu(props) {
    const navigate = useNavigate();
    const [done, setDone] = useState(false);
    const link = props.link;
    const image = props.image;
    let name = props.name;
    if (name.length > 20) {
        name = name.substring(0, 15);
        name += '...';
    }
    const price = props.price;
    const rate = props.rate;
    return (
        <Container>
            <ImageFood src={props.image}/>
            <ContentContainer>
                <TextItem>{props.name} </TextItem>
                <RateView>
                    <PriceAndStar>
                        <StarView>
                            <Rating name="read-only" value={props.rate} readOnly/>
                        </StarView>
                        <PriceText>{props.price} đ</PriceText>
                    </PriceAndStar>
                    <AddButton
                        onClick={() => {
                            setDone(!done)
                        }}
                    >
                        <AddText>THÊM</AddText>
                    </AddButton>
                </RateView>
            </ContentContainer>
            <ModalExtraItemSelect done={done} id={props.id} category={props.category}/>
        </Container>
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
const StarView = styled(Box)`
  flex-direction: row;
`
const StarImage = styled('img')`
  width: 12px;
  height: 12px;
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