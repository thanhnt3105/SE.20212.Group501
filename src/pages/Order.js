import React, {memo, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Header} from "../component/Header";
import {IMG_MOTORBIKE, IMG_ORDER_BACKGROUND} from "../assets";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../store/orderSlice";
import {BillOrder} from "../component/BillOrder";
import {EmptyCart} from "../component/EmptyCart";

export const Order = memo(function Order() {
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrders())
    }, [])
    const [currentId, setCurrentId] = useState(0);
    return (
        <Container>
            <Header/>
            <BackgroundMenu>YOUR ORDER</BackgroundMenu>
            {
                orders.fetchingStatus === 'SUCCESS' && orders.ids.length > 0 ?
                    <ContentContainer>
                        <Grid container spacing={2}>
                            <BillOrder
                                code={orders.ids[currentId]}
                                order={orders.entities[orders.ids[currentId]]}
                            />
                            <Grid item xs={6} md={6}>
                                <HistoryOrder>
                                    <MotorbikeImage src={IMG_MOTORBIKE}/>
                                    <TextHistory>LỊCH SỬ ĐƠN HÀNG</TextHistory>
                                    <br/>
                                    {
                                        orders.ids.map((id, index) =>
                                            <ButtonSelectOrder
                                                onClick={() => {
                                                    setCurrentId(index)
                                                }}
                                            >
                                                <TextButtonSelect>{"Mã đơn hàng: " + id}</TextButtonSelect>
                                            </ButtonSelectOrder>
                                        )
                                    }
                                </HistoryOrder>
                            </Grid>
                        </Grid>
                    </ContentContainer> :
                    <EmptyCart
                        title={'BẠN CHƯA CÓ ĐƠN HÀNG NÀO'}
                        content={'Hiện tại bạn chưa có sản phẩm nào trong giỏ hàng. ' +
                            'Hãy dạo một vòng Thực đơn để chọn sản phẩm yêu thích nhé, PizzaHUST có nhiều món ngon lắm!'}
                    />
            }
        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  background-color: #F4F1F1;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_ORDER_BACKGROUND});
  justify-content: center;
  font-size: 32px;
  color: white;
`
const ContentContainer = styled(Box)`
  flex-grow: 1;
  background-color: #F4F1F1;
  margin: 16px 80px;
`

const HistoryOrder = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const MotorbikeImage = styled('img')`
  width: 280px;
  height: 240px;
`
const TextHistory = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-top: 24px;
  width: 60%;
`
const ButtonSelectOrder = styled(Button)`
  background-color: #ec393e;
  border-radius: 12px;
  height: 100%;
  width: 60%;
  margin: 16px 0;
`
const TextButtonSelect = styled('p')`
  font-size: 16px;
  color: white;
`
