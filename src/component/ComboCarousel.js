import React, {useEffect, useState} from "react";
import {MobileStepper, Paper, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import SimpleImageSlider from "react-simple-image-slider";


export const ComboCarousel = function () {
    const navigate= useNavigate();
    const ids = useSelector(state => state.combos.ids);
    const combos = useSelector(state => state.combos.entities);
    const fetchingStatus = useSelector(state => state.combos.fetchingStatus);
    let images= [];
    ids.map((id,index)=>{
        images.push({
            url:combos[id].banner
        })
    })

    return fetchingStatus === 'SUCCESS' && (
        <div>
            <SimpleImageSlider
                width={1240}
                height={360}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                onClick={()=>{
                    navigate('/combos/')
                }}
            />
        </div>
    )
}