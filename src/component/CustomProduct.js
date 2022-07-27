import React,{memo,useCallback,useState} from "react";
import {IC_ADD_RED, IC_BACK_NO_BORDER, IC_NEXT_NO_BORDER, IMG_PIZZA_YOUR_CART} from "../assets";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {AddedExtra} from "./AddedExtra";
import {AddedPizza} from "./AddedPizza";
import {AddSlot} from "./Addslot";
import {ComboChooseModal} from "./ComboChooseModal";
const label ={
    'kid':'đồ cho bé',
    'pizza':'pizza',
    'appetizer':'khai vị',
    'vegetable':'đồ chay',
    'drink':'đồ uống',
    'dessert':'tráng miệng'
}
export const CustomProduct = memo(function CustomProduct(props){
    const [value, setValue] = useState('');
    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);
    const number = props.number;
    const category = props.category;
    const slot = props.slot;
    const handleAdd = props.handleAdd;
    const offset = props.offset ? props.offset : 0;
    const [open, setOpen] = useState(false);
    const [openSlot, setOpenSlot] = useState(-1);
    const openModal = (id) =>{
        setOpen(true)
        setOpenSlot(id)
    }
    const range = [];
    for(let i=offset;i<offset + number;i++)range.push(i);
    return (
        <div style={{borderBottom: '1px solid #5B5959FF', paddingBottom: 20, marginBottom: 20}}>
            <TextNormal>{label[category].toUpperCase()} x{number}</TextNormal>
            <br/>
            <Box sx={{alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
                {
                    range.map(i => slot[i] ? category !== 'pizza'?

                            <AddedExtra category={category} slotId = {i} productId={slot[i].productId} openModal = {openModal}/>
                            :
                            <AddedPizza slotId = {i} productId={slot[i].productId} openModal = {openModal}
                                        handleChange = {props.handleChange} pizzaInfo = {slot[i].pizzaInfo}
                            />
                        :
                        <AddSlot
                            category={category} slotId = {i}
                            openModal={openModal}/>)
                }
            </Box>
            {
                open && <ComboChooseModal
                    category = {category}
                    slotId = {openSlot}
                    handleClose = {() =>{setOpen(false)}}
                    handleAdd = {handleAdd}
                />
            }
        </div>
    )
})
const Container = styled('div')`
  position: absolute;
  outline: none;
  display: flex;
  flex-direction: column;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`
const BoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #F4F1F1;
  border-radius: 24px;
  padding: 16px;
`

const ImageCombo = styled('img')`
  width: 100%;
  height: 100%;
`
const InfoContainer = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
const ImageItem = styled('img')`
  width: 200px;
  height: 200px;
`
const ImageSaleOff = styled('img')`
  width: 60px;
  height: 60px;
`
const RightSection = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 12px;

`
const InfoContent = styled('div')`

`
const SelectFoodContainer = styled(BoxContainer)`

`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
`

const ImageFood = styled('img')`
  width: 160px;
  height: 120px;
`
const ButtonChangeFood = styled(Button)`
  background-color: #EC393E;
  width: 160px;
  height: 32px;
  border-radius: 24px;
`
const ConfirmOrder = styled(Button)`
  width: 240px;
  height: 32px;
  margin: 20px 0;
  background-color: #EC393E;
  border-radius: 12px;
`
const ButtonAction = styled('img')`
  width: 16px;
  height: 16px;
`
const TextConfirm = styled('span')`
  color: white;
  font-size: 12px;
`
const TextHeading = styled('span')`
  font-size: 20px;
  color: black;
`
const TextNormal = styled('span')`
  font-size: 16px;
  color: black;
  padding: 4px 0;
`
const TextLight = styled('span')`
  font-size: 12px;
  color: #5B5959FF;
`
const TextAdd = styled('span')`
  color: white;
  font-size: 12px;
`
const TextPrice = styled('span')`
  color: #fc2255;
  font-size: 20px;
`

const AddFood = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #fc2255;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background-color: #FFFBFB;
`
const AddRedButton = styled('img')`
  width: 24px;
  height: 24px;
`
const AddToCart = styled(Button)`
  height: 32px;
  background-color: #E2D8D8;
  border-radius: 12px;
`