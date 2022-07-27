import {useNavigate} from "react-router-dom";
import React, {useState} from 'react'
import Box from "@mui/material/Box";
import {IconButton, span} from "@mui/material";
import Stack from "@mui/material/Stack";
import {AddCircleRounded, InfoRounded} from "@mui/icons-material";
export const ChooseCard = (props)=>{
    const navigate = useNavigate();
    const category = props.category;
    const slotId = props.slotId;
    const handleAdd = props.handleAdd;
    const handleClose = props.handleClose;
    const productId = props.productId;
    const image = props.image;
    let name = props.name;
    if(name.length > 20){
        name = name.substring(0, 15);
        name += '...';
    }
    const price = props.price;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    return (
        <Box
            sx={{
                marginTop: '100px',
                alignSelf: 'flex-end'
            }}
        >
            <Box
                onMouseEnter={switchHov}
                onMouseLeave = {switchHov}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'start',
                    backgroundColor: hov ?'#ec393e': 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                    width: '200px',
                    height: '230px',
                    borderRadius: '24px',
                    p: 3,
                    boxSizing: 'border-box',
                    marginRight: {md: 0, sm: 2, xs: 2}
                }}
            >
                <img
                    src={image}
                    alt={name}
                    style={{
                        borderRadius: '50%',
                        boxShadow: '0px 30px 30px rgba(234, 106, 18, 0.05)',
                        alignSelf: 'center',
                        marginTop: '-1000px',
                        transform: 'translateY(-20px)',
                        width: '150px', height: '150px',
                        objectFit: 'cover'
                    }}
                />
                <span variant="subtitle1"
                            sx={{
                                fontFamily: 'Josefin Sans',
                                fontWeight: 600,
                                fontSize: '16px',
                                lineHeight: '175%',
                                color: hov? 'white': 'black',
                                textAlign: 'start',
                                marginBottom: '10px'
                            }}
                >{name}
                </span>
                <span variant="subtitle1"
                            sx={{
                                fontFamily: 'Josefin Sans',
                                fontWeight: 600,
                                fontSize: '13px',
                                lineHeight: '175%',
                                color: hov? 'white': '#EC393E',
                                textAlign: 'start'
                            }}
                >$ {price}
                </span>
                <Stack spacing={2} direction="row" sx={{alignSelf:"flex-end"}}>
                    <IconButton
                        size="small"
                        sx={{
                            width: '24px',
                            height: '24px'
                        }}
                        onClick={() =>{
                            handleAdd(slotId, productId, price)
                            handleClose()
                        }}
                    >

                        <AddCircleRounded
                            sx={{
                                color: hov ? 'white':'rgba(234, 106, 18, 0.7)',
                            }}
                        />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{
                            width: '24px',
                            height: '24px'
                        }}
                    >

                        <InfoRounded
                            sx={{
                                color: hov ? 'white':'rgba(234, 106, 18, 0.7)',
                            }}
                        />
                    </IconButton>
                </Stack>

            </Box>
        </Box>
    )
}