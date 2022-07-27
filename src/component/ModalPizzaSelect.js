import React, {memo, useCallback, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Fade, Grid, IconButton, ListItem, Modal, Rating, Snackbar, TextField, span} from "@mui/material";
import {IC_BACK_NO_BORDER, IC_NEXT_NO_BORDER, IC_PLUS, IC_SUBTRACT} from "../assets";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updatePizza} from "../store/categories/pizzaSlice";
import {ToppingCard} from "./ToppingCard";
import Stack from "@mui/material/Stack";
import {CommentBox} from "./CommentBox";
import List from "@mui/material/List";
import {CustomPagination} from "./TabInMenu/MenuKid";
import {itemAdded, itemUpdated} from "../store/cartSlice";

const axios = require('axios')
const round = (num) => Math.round(num * 100) / 100;
export const ModalPizzaSelect = memo(function ModalPizzaSelect(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(props.done)
    }, [props.done])

    const toggleModal = useCallback(() => {
        setModalVisible(false)
    }, [isModalVisible, props.done])

    const navigate = useNavigate();
    const location = props.location || {};
    const dispatch = useDispatch();
    const productId = props.id;
    const pizza = useSelector(state => state.pizzas.entities[productId]);
    const toppings = pizza.topping;
    const comments = pizza.comment ? pizza.comment : [];
    const sizes = pizza.size;
    const soles = pizza.type;
    const [size, setSize] = useState(location.state ? location.state.size : 0);
    const [sole, setSole] = useState(location.state ? location.state.sole : 0);
    const [num, setNum] = useState(location.state ? location.state.number : 1);
    const [total, setTotal] = useState(location.state ? round(location.state.total / location.state.number) : pizza.price);
    const [cmt, setCmt] = useState(false);
    const [tops, setTops] = useState(location.state ? location.state.toppings : {});
    const [done, setDone] = useState(false);
    //comment
    const [yourName, setYourName] = useState('')
    const [yourCmt, setYourCmt] = useState('')
    const [yourRate, setYourRate] = useState(0)
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('');
    const max = 2
    const totalPage = Math.ceil(comments ? comments.length / max : 1);
    const pageList = [];
    for (let i = 1; i <= totalPage; i++) pageList.push(i);
    const [page, setPage] = useState(1);
    const closeCmt = () => {
        setCmt(false)
        setYourName('')
        setYourCmt('')
    }
    const postComment = async () => {
        try {
            const newCmt = {
                comment_time: Math.floor(Date.now() / 1000),
                content: yourCmt,
                user_name: yourName,
                user_rating: yourRate
            }
            let newPizza = {}
            newPizza = Object.assign(newPizza, pizza)
            newPizza.comment = [...comments, newCmt]
            newPizza.rating = (pizza.rating * comments.length + yourRate) / (comments.length + 1)
            const result = await axios.put(
                'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_main_courses/' + productId + '/.json',
                newPizza)
            if (result.status === 200) {
                dispatch(updatePizza({id: productId, item: newPizza}))
                setMess('Your comment has been posted successfully')
                setPosted(true)
            }
            setYourRate(0);
            closeCmt()
        } catch (err) {
            setMess('Sorry, Failed to post your comment')
            setPosted(true)
            console.log(err)
        }
    }
    const handleAdd = (_id, add) => {
        setTotal(prev => add ? round(prev + toppings[_id].topping_price) : round(prev - toppings[_id].topping_price));
        if (add) {

            setTops(prev => {
                prev[_id] = true;
                return prev;
            });
        } else {
            setTops(prev => {
                prev[_id] = false;
                return prev;
            });
        }
    }
    const sizeChanged = (o, n) => {
        setSize(n);
        setTotal(prev => round(prev - sizes[o].type_price + sizes[n].type_price));
    }
    return (
        <Modal
            open={isModalVisible}
            onClose={(_, reason) => {
                if (reason == "backdropClick") {
                    toggleModal();
                }
            }}
            sx={{overflowY: 'auto',}}
        >
            <Container>
                <BoxContainer>
                    <InfoSection>
                        <ImageItem src={pizza.image_url}/>
                        <RightSection>
                            <TextHeading>{pizza.title}</TextHeading>
                            <br/>
                            <StarView>
                                <Rating name="read-only" value={pizza.rating} readOnly/>
                            </StarView>
                            <br/>
                            <TextLight>{pizza.description}</TextLight>
                            <br/>
                            <br/>
                            <TextPrice>{pizza.price + sizes[size].type_price} đ</TextPrice>
                            <RowSection>
                                <TextNormal style={{marginRight: 12}}>Cỡ: </TextNormal>
                                    <ButtonAction
                                        onClick={() => sizeChanged(size, size > 0 ? size - 1 : 0)}
                                        src={IC_BACK_NO_BORDER}/>
                                    <TextNormal
                                        style={{marginRight: 12, marginLeft: 12}}>{sizes[size].type_detail}</TextNormal>
                                    <ButtonAction
                                        onClick={() => sizeChanged(size, (size + 1) < sizes.length ? size + 1 : size)}
                                        src={IC_NEXT_NO_BORDER}/>
                            </RowSection>
                            <RowSection>
                                <TextNormal style={{marginRight: 12}}>Đế: </TextNormal>
                                <ButtonAction
                                    onClick={() => setSole(prev => {
                                        return prev === 1 ? 0 : 1
                                    })}
                                    src={IC_BACK_NO_BORDER}/>
                                <TextNormal style={{marginRight: 12, marginLeft: 12}}>{soles[sole]}</TextNormal>
                                <ButtonAction
                                    onClick={() => setSole(prev => {
                                        return prev === 1 ? 0 : 1
                                    })}
                                    src={IC_NEXT_NO_BORDER}/>
                            </RowSection>
                            <RowSection style={{
                                backgroundColor: 'rgb(208,204,204)',
                                borderRadius: 16,
                                width: 80,
                                justifyContent: 'space-between',
                                padding: 4,
                                marginTop: 8
                            }}>
                                <ButtonAction
                                    onClick={() => {
                                        setNum(prev => (prev === 1) ? 1 : prev - 1)
                                    }}
                                    src={IC_SUBTRACT}/>
                                <TextNormal>{num}</TextNormal>
                                <ButtonAction
                                    onClick={() => {
                                        setNum(prev => (prev === 10) ? 10 : prev + 1)
                                    }}
                                    src={IC_PLUS}/>
                            </RowSection>
                        </RightSection>
                    </InfoSection>
                    <ToppingSection>
                        <TextNormal>Toppings</TextNormal>
                        <br/>
                        <br/>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {
                            toppings.map((topping, toppingId) => {
                                return (
                                    <Grid item xs={6} key={toppingId}>
                                        <ToppingCard
                                            name={topping.topping_name}
                                            price={topping.topping_price}
                                            _id={toppingId}
                                            handleAdd={handleAdd}
                                            added={tops[toppingId]}
                                        />
                                    </Grid>
                                )
                            })
                        }
                        </Grid>

                    </ToppingSection>
                    <div style={{paddingLeft: 12, paddingRight: 12}}>
                        <RowSection style={{justifyContent: 'space-between'}}>
                            <TextHeading>Tổng đơn: {round(total * num)} đ</TextHeading>
                            <ConfirmOrder
                                onClick={() => {
                                    if (location.state) {
                                        dispatch(itemUpdated({
                                            id: location.state.id,
                                            data: {
                                                pizzaId: productId,
                                                size: size,
                                                sole: sole,
                                                toppings: tops,
                                                total: round(total * num),
                                                number: num
                                            }
                                        }));
                                    } else {
                                        dispatch(itemAdded({
                                            pizzaId: productId,
                                            size: size,
                                            sole: sole,
                                            toppings: tops,
                                            total: round(total * num),
                                            number: num
                                        }));
                                    }
                                    setDone(true);

                                }}
                            >
                                <TextConfirm> {location.state ? "CẬP NHẬT GIỎ HÀNG" : "THÊM VÀO GIỎ HÀNG"}</TextConfirm>
                            </ConfirmOrder>
                        </RowSection>
                    </div>
                </BoxContainer>
                <br/>
                <FeedBackContainer>
                    <RowSection style={{
                        justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: 12,
                        paddingLeft:12,paddingRight:12
                    }}>
                        <TextHeading>Đánh Giá </TextHeading>
                        <AddFeedBackButton
                            onClick={() => {
                                setCmt(true)
                            }}
                        >
                            <TextNormal style={{color: "white"}}>THÊM ĐÁNH GIÁ</TextNormal>
                        </AddFeedBackButton>
                    </RowSection>
                    <br/>
                    <Modal open={cmt} onClose={closeCmt}>
                        <Fade in={cmt} timeout={500}>
                            <Stack
                                spacing={1}
                                sx={{
                                    borderRadius: '24px',
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    p: 4,
                                    boxShadow: 24,
                                    width: {md: '50%', sm: '80%', xs: '90%'}
                                }}
                            >
                                <span variant="h6"
                                            sx={{
                                                fontFamily: 'Playfair Display',
                                                fontWeight: 700,
                                                fontSize: '20px',
                                                lineHeight: '52px',
                                                color: '#07143B',
                                                textAlign: 'center',
                                            }}
                                >Bình luận của bạn
                                </span>
                                <TextField
                                    required
                                    id="name-field"
                                    label="Tên"
                                    multiline
                                    maxRows={1}
                                    color='warning'
                                    inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                    InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                    sx={{
                                        width: '100%'
                                    }}
                                    onChange={(e) => {
                                        setYourName(e.target.value)
                                    }}
                                />
                                <TextField
                                    color='warning'
                                    required
                                    id="name-field"
                                    label="Bình luận"
                                    multiline
                                    rows={4}
                                    maxRows={4}
                                    inputProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input text
                                    InputLabelProps={{style: {fontFamily: 'Josefin Sans'}}} // font size of input label
                                    onChange={(e) => {
                                        setYourCmt(e.target.value)
                                    }}
                                />
                                <Stack direction="row" spacing={5}
                                       sx={{alignItems: 'center'}}
                                >
                                    <span variant="h6"
                                                sx={{
                                                    fontFamily: 'Josefin Sans',
                                                    fontWeight: 700,
                                                    fontSize: '15px',
                                                    lineHeight: '52px',
                                                    color: '#07143B',
                                                    textAlign: 'center',
                                                }}
                                    >Đánh giá:
                                    </span>
                                    <Rating
                                        onChange={(e, newRate) => {
                                            setYourRate(newRate)
                                        }}
                                        sx={{
                                            color: '#EC393E',
                                        }}

                                    />
                                </Stack>
                                {
                                    (yourName.length === 0 || yourCmt.length === 0) &&
                                    (<span variant="h6"
                                                 sx={{
                                                     fontFamily: 'Josefin Sans',
                                                     fontWeight: 700,
                                                     fontSize: '15px',
                                                     lineHeight: '52px',
                                                     color: '#07143B',
                                                     textAlign: 'center',
                                                 }}
                                    >
                                        Hãy điền đủ thông tin
                                    </span>)
                                }
                                <Button variant="contained"
                                        onClick={postComment}
                                        sx={{
                                            backgroundColor: '#EC393E',
                                            borderRadius: '100px',
                                            alignSelf: 'center',
                                            fontFamily: 'Josefin Sans',
                                            fontWeight: 'normal',
                                            fontSize: '15px',
                                            lineHeight: '175%',
                                            color: 'white',
                                            '&:hover, &:active': {
                                                backgroundColor: '#f57c00'
                                            },
                                            marginBottom: 2
                                        }}
                                        disabled={yourName.length === 0 || yourCmt.length === 0}
                                >
                                    Đăng
                                </Button>
                            </Stack>
                        </Fade>
                    </Modal>
                    <List sx={{
                        width: '100%', height: '90%', backgroundColor: 'rgba(252, 237, 227, 0.3)', alignSelf: 'center'
                    }}>
                        {
                            comments && comments.length > 0 ?
                                comments.map((comment, index) =>
                                    (index >= (page - 1) * max && index < page * max) ?
                                        <ListItem>
                                            <CommentBox comment={comment}/>
                                        </ListItem>
                                        : false
                                )
                                :
                                <div>No comment
                                </div>
                        }
                    </List>
                    <Box sx={{width: '80%', justifyContent: 'center', marginTop: '10px', display: 'flex'}}>
                        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
                                          onChange={(event, value) => {
                                              setPage(value)
                                          }} size="large" page={page}/>
                    </Box>
                </FeedBackContainer>
                <Modal open={done}>
                    <Fade in={done} timeout={500}>
                        <StackModalAddCart
                            spacing={3}
                            sx={{p: 5}}
                        >
                            <TextAddCart>ĐÃ THÊM VÀO GIỎ HÀNG</TextAddCart>
                            <Stack direction="row" spacing={5}>
                                <ButtonModalAddToCart variant="contained"
                                        onClick={() => {
                                            setDone(false);
                                        }}
                                >
                                    Hoàn thành
                                </ButtonModalAddToCart>
                                <ButtonModalAddToCart variant="contained"
                                        onClick={() => {
                                            navigate('/cart');
                                        }}>
                                    Xem giỏ hàng
                                </ButtonModalAddToCart>
                            </Stack>

                        </StackModalAddCart>
                    </Fade>
                </Modal>
                <Snackbar
                    open={posted}
                    onClose={() => {
                        setPosted(false)
                    }}
                    message={message}
                    autoHideDuration={6000}
                />

            </Container>

        </Modal>
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
  padding: 12px;
`
const InfoSection = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid black;
`
const ImageItem = styled('img')`
  width: 49%;
`
const RightSection = styled('div')`
  width: 49%;
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
const TextPrice = styled('span')`
  color: #fc2255;
  font-size: 24px;
`
const StarView = styled(Box)`
  flex-direction: row;
`
const StarImage = styled('img')`
  width: 12px;
  height: 12px;
`
const RowSection = styled('div')`
  display: flex;
  align-items: center;
`
const ButtonAction = styled('img')`
  width: 16px;
  height: 16px;
`
const ToppingSection = styled('div')`
  padding: 8px 20px;
  border-bottom: 1px solid black;

`
const ButtonAdd = styled(IconButton)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(103, 101, 101, 0.5);
`

const ConfirmOrder = styled(Button)`
  width: 240px;
  height: 32px;
  margin: 20px 0;
  background-color: #EC393E;
  border-radius: 12px;
`
const TextConfirm = styled('span')`
  color: white;
  font-size: 16px;
`
const FeedBackContainer = styled(BoxContainer)`

`
const AddFeedBackButton = styled(Button)`
  width: 180px;
  height: 36px;
  background-color: #E2D8D8;
  border-radius: 24px;
`
const BoxFeedBack = styled(Box)`
  background-color: #d3cbcb;
  padding: 8px;
  border-radius: 12px;
`

const StackModalAddCart =styled(Stack)`
  background-color: white;
  border-radius: 24px;
  width: 500px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  align-items: center;
`
const TextAddCart = styled('span')`
  font-size: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`
const ButtonModalAddToCart = styled(Button)({
    backgroundColor: '#EC393E',
    borderRadius: '100px',
    //maxWidth: '150px',
    fontSize: '15px',
    lineHeight: '175%',
    color: 'white',
    height: '45px',
    '&:hover, &:active': {
        backgroundColor: '#EA4D52FF'
    },
    marginBottom: 2
})