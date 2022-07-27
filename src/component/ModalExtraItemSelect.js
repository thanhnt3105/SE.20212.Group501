import React, {memo, useCallback, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Fade, ListItem, Modal, Rating, Snackbar, TextField, span} from "@mui/material";
import {IC_PLUS, IC_SUBTRACT} from "../assets";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Stack from "@mui/material/Stack";
import {CommentBox} from "./CommentBox";
import List from "@mui/material/List";
import {CustomPagination} from "./TabInMenu/MenuKid";
import { itemAdded } from "../store/cartExtraSlice";
import {updateDessert} from "../store/categories/dessertSlice";
import {updateDrink} from "../store/categories/drinkSlice";
import {updateVegetable} from "../store/categories/vegetableSlice";
import {updateKid} from "../store/categories/kidSlice";
import {updateAppetizer} from "../store/categories/appetizerSlice";

const axios = require('axios')
const round = (num) => Math.round(num * 100) / 100;
export const ModalExtraItemSelect = memo(function ModalExtraItemSelect(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = {
        'dessert': {
            selector: useSelector(state => state.desserts),
            link: 'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_dessert/',
            update: updateDessert
        },
        'drink': {
            selector: useSelector(state => state.drinks),
            link: 'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_drink/',
            update: updateDrink
        },
        'vegetable': {
            selector: useSelector(state => state.vegetables),
            link: 'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_vegetarian/',
            update: updateVegetable
        },
        'kid': {
            selector: useSelector(state => state.kids),
            link: 'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_kid/',
            update: updateKid
        },
        'appetizer': {
            selector: useSelector(state => state.appetizers),
            link: 'https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_appetizer/',
            update: updateAppetizer
        }
    }
    const category = props.category;
    const productId = props.id
    const extra = categories[category].selector.entities[productId];
    const comments = extra.comment ? extra.comment : [];
    const [num, setNum] = useState(1);
    const [cmt, setCmt] = useState(false);
    const [done, setDone] = useState(false);
    //comment
    const [yourName, setYourName] = useState('')
    const [yourCmt, setYourCmt] = useState('')
    const [yourRate, setYourRate] = useState(0)
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('')
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
            let newExtra = {}
            newExtra = Object.assign(newExtra, extra)
            newExtra.comment = [...comments, newCmt]
            newExtra.rating = (extra.rating * comments.length + yourRate) / (comments.length + 1)
            const result = await axios.put(
                categories[category].link + productId + '/.json',
                newExtra)
            if (result.status === 200) {
                dispatch(categories[category].update({id: productId, item: newExtra}))
                setMess('Bình luận của bạn đã được đăng thành công')
                setPosted(true)
            }
            closeCmt()
        } catch (err) {
            console.log(err)
            setMess('Xin lỗi, có sự cố xảy ra')
            setPosted(true)
        }
    }
    useEffect(() => {
        setModalVisible(props.done)
    }, [props.done])

    const toggleModal = useCallback(() => {
        setModalVisible(false)
    }, [isModalVisible, props.done])
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
                        <ImageItem src={extra.image_url}/>
                        <RightSection>
                            <TextHeading>{extra.title}</TextHeading>
                            <br/>
                            <StarView>
                                <Rating name="read-only" value={extra.rating} readOnly/>
                            </StarView>
                            <br/>
                            <TextLight>{extra.description}</TextLight>
                            <br/>
                            <br/>
                            <TextPrice>{extra.price} đ</TextPrice>

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

                    <div style={{paddingLeft: 12, paddingRight: 12}}>
                        <RowSection style={{justifyContent: 'space-between'}}>
                            <TextHeading>Tổng đơn: {round(extra.price * num)} đ</TextHeading>
                            <ConfirmOrder
                                onClick={() => {
                                    dispatch(itemAdded({
                                        extraId: productId,
                                        number: num,
                                        category: category,
                                        total: round(num * extra.price)
                                    }))
                                    setDone(true);
                                }
                                }
                            >
                                <TextConfirm>THÊM VÀO GIỎ HÀNG</TextConfirm>
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
                        <TextHeading>Bình luận</TextHeading>
                        <AddFeedBackButton
                            onClick={() => {
                                setCmt(true)
                            }}
                        >
                            <TextNormal style={{color: "white"}}>Thêm bình luận</TextNormal>
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
                                        <ListItem key={index}>
                                            <CommentBox comment={comment}/>
                                        </ListItem>
                                        : false
                                )
                                :
                                <div>No comment
                                </div>
                        }
                    </List>
                    <Box sx={{width: '100%', justifyContent: 'center', marginTop: '10px', display: 'flex'}}>
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
                            sx={{p: 5,}}
                        >
                            <TextAddCart>Đã thêm vào giỏ hàng</TextAddCart>
                            <Stack direction="row" spacing={5}>
                                <ButtonModalAddToCart variant="contained"
                                        onClick={() => {
                                            setDone(false);
                                        }}
                                >
                                    Hoàn tất
                                </ButtonModalAddToCart>
                                <ButtonModalAddToCart variant="contained"
                                        onClick={() => {
                                            navigate('/cart');
                                        }}
                                >
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