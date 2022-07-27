import React, {memo, useState} from "react";
import {IC_PLUS, IC_SUBTRACT} from "../assets";
import {styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";

export const ToppingCard = memo(function ToppingCard(props) {
    const name = props.name;
    const handleAdd = props.handleAdd;
    const price = props.price;
    const _id = props._id;
    const [added, setAdded] = useState(props.added);
    return (
        <div>
            <ButtonAdd
                onClick={
                    () => {
                        setAdded(prev => !prev);
                        handleAdd(_id, !added);
                    }
                }
                sx={{marginRight: 2}}>
                <ButtonAction src={added ? IC_SUBTRACT : IC_PLUS}/>
            </ButtonAdd>
            <TextNormal style={{marginRight: 12}}>{name}:</TextNormal>
            <TextNormal style={{color: "red"}}>{price} đ</TextNormal>
        </div>
    )
})
const ButtonAction = styled('img')`
  width: 16px;
  height: 16px;
`
const ButtonAdd = styled(IconButton)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgb(208,204,204);
`
const TextNormal = styled('span')`
  font-size: 16px;
  color: black;
  padding: 4px 0;
`