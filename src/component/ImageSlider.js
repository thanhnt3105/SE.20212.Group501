import React, {memo, useCallback, useState} from "react";
import {styled} from '@mui/material/styles';
import {IC_BACK, IC_NEXT, IMG_SLIDER} from "../assets";
import Button from "@mui/material/Button";

const images = [
    {
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];
export const ImageSlider = memo(function ImageSlider() {
    const [current,setCurrent]=useState(0);
    const length = images.length;

    const nextSlide =useCallback(()=>{
        setCurrent(current === length-1 ? 0 : current+1)
    },[current])

    if(!Array.isArray(images) || images.length<=0){
        return  null;
    }

    return (
        // <Container>
        //     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}
        //     >
        //         {images.map((slider,index)=>{
        //             return <div
        //             className={index===current ? 'slide active' : 'slide'}
        //             key={index}
        //             >
        //                 {
        //                     index===current && (
        //                         <ImageSlide src={slider.imgPath}  key={index}/>
        //                     )
        //                 }
        //             </div>
        //         })}
        //     </div>
        //       <RowSection>
        //           <ActionLeftButton>
        //               <ImageButtonAction src={IC_BACK}/>
        //           </ActionLeftButton>
        //           <ActionRightButton>
        //               <ImageButtonAction src={IC_NEXT}/>
        //           </ActionRightButton>
        //       </RowSection>
        // </Container>
        <Container>
            <ImageSlide src={IMG_SLIDER}/>
        </Container>
    )
})
const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
`
const RowSection=styled('div')`
display: flex;
  width: 100%;
  padding: 0 200px;
  align-items: center;
  justify-content: space-between;
  margin-top: -120px;
`
const ActionRightButton = styled(Button)`
  width: 40px;
  height: 40px;
  color: black;
  cursor: pointer;
  user-select: none;
`
const ActionLeftButton =styled(Button)`
  width: 40px;
  height: 40px;
  color: black;
  cursor: pointer;
  user-select: none;
`
const ImageButtonAction =styled('img')`
width: 40px;
  height: 40px;
`
const ImageSlide = styled('img')`
width: 100%;
`