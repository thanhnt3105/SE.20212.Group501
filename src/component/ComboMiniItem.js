import React,{memo} from "react";
import Box from "@mui/material/Box";

export const ComboMiniItem = memo(function ComboMiniItem(props){
    const image = props.image;
    const title = props.title;
    return (
        <Box
            sx={{
                borderRadius: '25px',
                backgroundColor : 'rgba(252, 237, 227, 0.3)',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                width: '30%',
                margin: '10px'
            }}
        >
            <img
                src={image}
                alt={title}
                style={{
                    borderRadius: '50px',
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover'
                }}
            />
            <p
                        style={{
                            fontWeight: 600,
                            fontSize: {md: '16px', sm: '14px', xs: '13px'},
                            lineHeight: '175%',
                            color: 'black',
                            textAlign: 'start',
                            marginLeft: '10%'
                        }}
            >{title}
            </p>
        </Box>
    )
})