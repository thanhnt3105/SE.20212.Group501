import * as React from "react";
import {memo, useState} from "react";

import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import {Header} from "../component/Header";
import PropTypes from "prop-types";
import {BestReviewItem} from "../component/BestReviewItem";
import {CircularProgress, Grid, Grow, Pagination, Tab, Tabs} from "@mui/material";
import Stack from "@mui/material/Stack";
import {IC_FACEBOOK, IC_GMAIL, IC_INSTAGRAM, IMG_LOGO, IMG_QR_CODE} from "../assets";
import Button from "@mui/material/Button";
import {ImageSlider} from "../component/ImageSlider";
import {useSelector} from "react-redux";
import {BestTrendingItem} from "../component/BestTrendingItem";
import {ComboItem} from "../component/ComboItem";
import {ComboCarousel} from "../component/ComboCarousel";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


const TabPanel = memo((props) => {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{padding: 4}}>
                    {children}
                </Box>
            )}
        </div>
    )
})
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Home = memo(function Home() {
    let categories = [
        {category: 'pizza', selector: useSelector(state => state.pizzas)},
        {category: 'vegetable', selector: useSelector(state => state.vegetables)},
        {category: 'kid', selector: useSelector(state => state.kids)},
        {category: 'dessert', selector: useSelector(state => state.desserts)},
        {category: 'appetizer', selector: useSelector(state => state.appetizers)},
        {category: 'drink', selector: useSelector(state => state.drinks)},
    ]
    categories.map((category) =>{
        const products = category.selector;
        const sortedIds = [...products.ids];
        sortedIds.sort((id1, id2) => products.entities[id2].order_number - products.entities[id1].order_number)
        category.mostOrder = products.entities[sortedIds[0]]
        category.mostId = sortedIds[0]
    })
    const [value, setValue] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const pizzas = useSelector(state => state.pizzas);
    const fetchingStatus = pizzas.fetchingStatus;
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const ids=categories.length;
    const max = 3;
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);

    let sortedIds = [...pizzas.ids];
    if (fetchingStatus === 'SUCCESS')
        sortedIds.sort((id1, id2) => pizzas.entities[id2].rating - pizzas.entities[id1].rating)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log('user',currentUser)

    return (
        <Container>
            <Header/>
            {/*<ImageSlider/>*/}
            <ComboCarousel/>
            <ContentContainer>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                              textColor={'inherit'}
                              TabIndicatorProps={{
                                  style: {
                                      backgroundColor: "red",
                                  },
                              }}
                        >
                            <AntTab label='Hôm nay ăn gì?' disabled/>
                            <AntTab label="Đánh giá tốt nhất" {...a11yProps(1)} />
                            <AntTab label="Món nổi bật nhất" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={1}>
                        <Stack direction={'row'} spacing={2}>
                            {
                                fetchingStatus === 'SUCCESS' ? sortedIds.map((id, index) => {
                                    return (index < 4) && <div key={index}>
                                        <BestReviewItem image={pizzas.entities[id].image_url}
                                                        name={pizzas.entities[id].title}
                                                        rate={pizzas.entities[id].rating}
                                                        price={pizzas.entities[id].price} link={`/pizza/${id}`}
                                                        id={id}
                                        />
                                    </div>
                                }) : null
                            }
                        </Stack>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                    {
                                        categories.map((category,index)=>{
                                            return(
                                                category.selector.fetchingStatus === 'SUCCESS' && (index<4) &&
                                               <div key={index} style={{margin:8}}>
                                                   <BestTrendingItem order = {category.mostOrder} category = {category.category}
                                                                     id= {category.mostId}
                                                   />
                                               </div>
                                            )
                                        })
                                    }
                                </Grid>
                        }
                    </TabPanel>
                </Box>
            </ContentContainer>
            <Footer>
                <InfoSection>
                    <ImagePizzaHust src={IMG_LOGO}/>
                    <div style={{color: 'white', fontSize: 24}}>0333666999</div>
                    <p style={{color: 'white', fontSize: 12}}>@PizzaHust | Privacy Policy</p>
                </InfoSection>
                <ContactSection>
                    <ConnectView>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{color: 'white', fontSize: 14, marginRight: 12}}>Kết nối với PizzaHust : </p>
                            <IconImage src={IC_FACEBOOK}/>
                            <IconImage src={IC_GMAIL}/>
                            <IconImage src={IC_INSTAGRAM}/>
                        </div>
                        <Button style={{borderColor: "white", color: 'white'}} variant="outlined" onClick={()=>{
                            navigate('/login')
                        }}>Đăng nhập QTV</Button>
                    </ConnectView>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                                <TextStyle>Cam kết</TextStyle>
                                <TextStyle>Lịch sử</TextStyle>
                                <TextStyle>Tuyển dụng</TextStyle>
                            </div>
                            <div>
                                <TextStyle>Thực đơn</TextStyle>
                                <TextStyle>Khuyến mãi</TextStyle>
                                <TextStyle>Quản lý</TextStyle>
                            </div>
                            <div>
                                <TextStyle>Theo dõi đơn hàng</TextStyle>
                                <TextStyle>Danh sách cửa hàng</TextStyle>
                                <TextStyle>Về chúng tôi</TextStyle>
                            </div>
                            <img style={{width: 120, height: 120}} src={IMG_QR_CODE}/>
                        </div>
                        <p style={{color: 'white', fontSize: 12}}>Địa chỉ: D9, Số 1 đường Đại Cồ Việt, phường Bách Khoa,
                            Hai Bà Trưng, Hà Nội </p>
                    </div>
                </ContactSection>
            </Footer>
        </Container>
    )
})

const Container = styled(Box)`
  margin-top: 48px;
  width: 100%;
  display: flex;
  background-color: #F2EDED;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const ContentContainer = styled(Box)`
  display: flex;
  position: relative;
  width: 80%;
  background-color: #FFFBFB;
  border-radius: 12px;
  padding: 12px 20px;
  margin: 24px 0;
`

const Footer = styled(Box)`
  display: flex;
  width: 100%;
  background-color: black;
  justify-content: space-between;
  align-items: center;
`

const InfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 120px;
`

const ImagePizzaHust = styled('img')`
width: 100%;
`
const ContactSection = styled(Box)`
  width: 60%;
  padding: 0 24px;
`
const IconImage = styled('img')`
  width: 20px;
  height: 20px;
  margin: 0 5px;
`
const ConnectView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  margin-bottom: 8px;
`
const TextStyle = styled('p')`
  color: white;
  font-size: 12px;
`
const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        fontFamily: 'Josefin Sans'
    },
    "& .MuiPaginationItem-root:active": {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    },
    '& .Mui-selected': {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    }
})
const AntTab = styled(Tab)({
    color: 'rgba(0,0,0,0.85)',
    '&:hover': {
        color: '#EC393E'
    },
    '&.Mui-selected': {
        color: '#EC393E'
    },
})
