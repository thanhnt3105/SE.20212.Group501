import React from 'react'
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {IconButton, span} from "@mui/material";
import {AddCircleRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {IC_ADD_RED} from "../assets";
const label ={
    'kid':'đồ cho bé',
    'pizza':'pizza',
    'appetizer':'khai vị',
    'vegetable':'đồ chay',
    'drink':'đồ uống',
    'dessert':'tráng miệng'
}
export const AddSlot = (props) =>{
    const slotId = props.slotId;
    const category = props.category;
    const openModal = props.openModal;
    return(
        <Box
            sx={{
                borderRadius: '12px',
                borderColor: '#EC393E',
                borderStyle: 'dashed',
                borderWidth: '2px',
                width: '100%',
                alignItems: 'center',
                m: 3,
                p: 3,
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}
        >
            <IconButton
                sx={{
                }}
                onClick={() => {openModal(slotId)}}
            >
                <ImageAddIcon src={IC_ADD_RED}
                />
            </IconButton>
            <span
                style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '22.75px',
                    color: 'black',
                    textAlign: 'center',
                }}
            >Chọn {label[category]}
            </span>
        </Box>
    )
}

const ImageAddIcon = styled('img')`
width: 36px;
  height: 36px;
  color: rgba(234,106,18,0.7);

`