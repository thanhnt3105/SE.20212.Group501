import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {Modal, span} from "@mui/material";
import Box from "@mui/material/Box";
import {CustomPagination} from "./TabInMenu/MenuKid";
import {ChooseCard} from "./ChooseCard";

const label ={
    'kid':'đồ cho bé',
    'pizza':'pizza',
    'appetizer':'khai vị',
    'vegetable':'đồ chay',
    'drink':'đồ uống',
    'dessert':'tráng miệng'
}
export const ComboChooseModal = (props) =>{
    const menu = {
        'pizza': useSelector(state => state.pizzas),
        'kid': useSelector(state => state.kids),
        'drink': useSelector(state => state.drinks),
        'appetizer': useSelector(state => state.appetizers),
        'vegetable': useSelector(state => state.vegetables),
        'dessert': useSelector(state => state.desserts),
    }
    const handleAdd = props.handleAdd;
    const handleClose = props.handleClose;
    const category = props.category;
    const slotId = props.slotId;
    const max = 5;
    const ids = menu[category].ids;
    const products = menu[category].entities;
    const totalPage = Math.ceil(ids.length / max);
    const [page, setPage] = useState(1)

    return(
        <Modal open= {true} onClose={handleClose}>
            <Box
                sx={{
                    borderRadius: '24px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 4,
                    boxShadow: 24,
                    width: {md: '80%', sm: '80%', xs: '90%'},
                }}
            >
               <div style={{display:'flex',alignItems:'center',borderBottom:'1px solid black',justifyContent:'center'}}>
                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: '32px',
                            color: '#07143B',
                            textAlign: 'start',
                            margin: '20px'
                        }}
                    >Chọn {label[category]}
                </span>
               </div>
                <Box sx={{
                    m: 1,
                    p: 2,
                    backgroundColor: 'rgba(252, 237, 227, 0.3)',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    overflow: 'auto'
                }}>
                    {
                        ids
                            .map((id, index) =>{
                                return (index >= (page - 1)*max && index < page * max) &&

                                    <ChooseCard image={products[id].image_url} name={products[id].title} price={products[id].price}
                                                handleAdd = {handleAdd} category = {category} slotId = {slotId}
                                                productId = {id} handleClose = {handleClose}
                                    />

                            })
                    }
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <CustomPagination variant="outlined" shape="rounded" count={totalPage}
                                      onChange={(event, value) => {setPage(value)}} size="large" page={page}
                    />
                </Box>

            </Box>
        </Modal>
    )
}