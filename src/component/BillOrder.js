import React,{memo} from "react";
import {Grid, Step, StepLabel, Stepper} from "@mui/material";
import {IC_LINE} from "../assets";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

export const BillOrder = memo(function BillOrder(props){
    const label ={
        'kid':'Đồ cho bé',
        'pizza':'Pizza',
        'appetizer':'Khai vị',
        'vegetable':'Đồ chay',
        'drink':'Đồ uống',
        'dessert':'Tráng miệng'
    };
    const statusStepper = {'Pending':'Duyệt','Prepairing':'Chuẩn bị','Shipping':'Vận chuyển','Completed':'Hoàn thành'}
    const order = props.order;
    const categories = ['kid', 'dessert', 'appetizer', 'drink', 'vegetable']
    //const categories = ['Đồ cho bé', 'Tráng miệng', 'Khai vị', 'Đồ uống', 'Đồ chay']
    const steps = ['Duyệt', 'Chuẩn bị', 'Vận chuyển', 'Hoàn thành']
    const activeStep = steps.findIndex(step => step === statusStepper[order.status])
    const timeToDate = (time) =>{
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()
        return year + '/' + month + '/' + day + " - " + hour + ":" + min + ":" + sec;
    }
    return (
        <Grid item xs={6} md={6}>
            <PaperSection>
                <HeaderSection>{`Mã đơn - ${props.code}`}</HeaderSection>
                <RowSection>
                    <TextInfo style={{marginRight:80}}>{`Tên: ${order.customer}`}</TextInfo>
                    <TextInfo>{`Số điện thoại: ${order.phone}`}</TextInfo>
                </RowSection>
                <br/>
                <br/>
                <RowSection style={{
                    borderBottom: '1px solid #a8a5a5',
                    paddingBottom:20
                }}>
                    <TextInfo style={{marginRight:80}}>{`Địa chỉ: ${order.address}`}</TextInfo>
                    <TextInfo>{`Thời gian: ${timeToDate(order.time)}`}</TextInfo>
                </RowSection>
                <br/>
                <br/>
                {order.detail.pizza &&
                    <TextHeading>Pizza:</TextHeading>
                }
                <br/>
                <br/>
                <br/>
                {order.detail.pizza && order.detail.pizza.map(pizza =>
                    <TextInfo>{"+ Mã sản phẩm: " + pizza.id + "\t\tx" + pizza.number}</TextInfo>
                )}
                <br/>
                {/*<br/>*/}
                {/*<div  style={{*/}
                {/*    borderBottom: '1px solid #a8a5a5',*/}
                {/*    paddingBottom:20*/}
                {/*}}>*/}
                {/*    <TextInfo>+ Mã sản phẩm:M4 x1 </TextInfo>*/}
                {/*</div>*/}
                <br/>
                <br/>
                <br/>
                {
                    categories.map(category => order.detail[category] &&
                        <Box sx={{width: '50%'}}>
                            <TextHeading variant="h6">{label[category]}</TextHeading>
                            {
                                order.detail[category].map(product =>
                                    <div  style={{
                                        borderBottom: '1px solid #a8a5a5',
                                        paddingBottom:20
                                    }}>
                                        <TextInfo>{"+ Mã sản phẩm: " + product.id + "\t\tx" + product.number}</TextInfo>
                                    </div>
                                )}
                        </Box>
                    )
                }
                <br/>
                <br/>
                <br/>
                <TextInfo>{`Tổng tiền: ${order['total payment']}`}</TextInfo>
                <br/>
                <br/>
                <TextInfo>Phí vận chuyển: {order['shipping payment']}</TextInfo>
                <br/>
                <br/>
                <StatusTextHeader>Trạng thái</StatusTextHeader>
                <Stepper
                    color='warning'
                    activeStep={activeStep}
                    alternativeLabel
                >
                    {
                        steps.map(step =>
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        )
                    }
                </Stepper>
            </PaperSection>
        </Grid>
    )
})
const PaperSection = styled(Box)`
  background-color: white;
  border-radius: 12px;
  box-shadow: 9px 9px 8px -3px rgba(84, 66, 66, 0.75);
  -webkit-box-shadow: 9px 9px 8px -3px rgba(84, 66, 66, 0.75);
  -moz-box-shadow: 9px 9px 8px -3px rgba(84, 66, 66, 0.75);
  padding: 40px 24px;
`
const HeaderSection = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #a8a5a5;
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-top: 24px;
`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
  margin-top:16px;
`
const TextInfo = styled('span')`
  font-size: 16px;
  color: black;
  font-weight: 600;
`
const TextHeading = styled(TextInfo)`
  font-size: 20px;
`
const StatusSection=styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StatusIndex=styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`
const CircleIcon=styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: gray;
`
const NumberStatus=styled('span')`
font-size: 8px;
  color: white;
`
const LineIcon=styled('img')`
width: 80px;
  height: 2px;
  tint-color:black;
`
const StatusTextHeader = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`
