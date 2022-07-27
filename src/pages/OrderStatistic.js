import React, {memo, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IC_ALL_ORDERS, IC_BENEFIT, IC_THOI, IMG_BACKGROUND_STATISTIC, IMG_ORDER_BACKGROUND} from "../assets";

export const OrderStatistic = memo(function OrderStatistic(){
    const [OrderLists,setOrderLists]=useState([]);
    useEffect(()=>{
        async function fetchOrderLists() {
            const requestUrl='https://pizzahust-c5035-default-rtdb.firebaseio.com/menu.json';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();

            setOrderLists(responseJSON);


        }

        fetchOrderLists();
    },[])

    let totalpay = 0;
    let totaldish = 0;
    let totalcustomer =Object.values(OrderLists).length;

    Object.values(OrderLists).forEach(order => {
        totalpay += order['total payment'];


        const detail = order.detail;
        for (var pizza in detail){
            totaldish += detail[pizza].length;
        }
    });

    totalpay /= 1000;
    return (
        <Container>
            <Header/>
            <BackgroundMenu>ORDER STATISTIC</BackgroundMenu>
            <RowSection>
                <ContentBox>
                    <div style={{marginRight:24}}>
                        <NumberText>{`${totalpay} K`}</NumberText>
                        <br/>
                        <ContentText>Doanh thu</ContentText>
                    </div>
                    <BenefitImg src={IC_BENEFIT}/>
                </ContentBox>
                <ContentBoxWhite>
                    <div style={{width:'50%',padding:'12px 32px'}}>
                        <NumberText>23%</NumberText>
                        <br/>
                        <ContentText>Tại quán</ContentText>
                    </div>
                    {/*<ThoiImg src={IC_THOI}/>*/}
                    <div style={{width:'50%',height:'100%',backgroundColor:'white',padding:'12px 32px',borderRadius:16}}>
                        <NumberText style={{color:'#ec393e'}}>77%</NumberText>
                        <br/>
                        <ContentText style={{color:'#ec393e',fontSize:20}}>Giao hàng</ContentText>
                    </div>
                </ContentBoxWhite>
                <ContentBox style={{backgroundColor:'white'}}>
                    <img style={{height:80}} src={IC_ALL_ORDERS}/>
                    <div style={{marginLeft:24,display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
                        <NumberText style={{color:'#ec393e'}}>{`${totaldish}`}</NumberText>
                        <br/>
                        <ContentText style={{color:'#ec393e'}}>Tổng món</ContentText>
                    </div>
                </ContentBox>
            </RowSection>
        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  background-color: white;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_BACKGROUND_STATISTIC});
  justify-content: center;
  font-size: 32px;
  color: white;
`

const ContentBox = styled('div')`
background-color: #ec393e;
  padding:12px 60px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.75);
`
const ContentBoxWhite = styled('div')`
  background-color: #ec393e;
  display: flex;
  align-items: center;
  border-radius: 16px;
  box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.75);
`
const ContentText = styled('span')`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 34px;
  text-align: center;
  color: #FFFFFF;
`
const NumberText = styled('span')`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 68px;
  text-align: center;
  color: #FFFFFF;
`
const RowSection = styled('div')`
display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`
const BenefitImg= styled('img')`
width: 80px;
  height: 80px;
`
const ThoiImg= styled('img')`
height: 90%;
`