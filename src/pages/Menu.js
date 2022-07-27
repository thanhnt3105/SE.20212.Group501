import React, {memo, useState} from "react";
import {Header} from "../component/Header";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Tab, Tabs, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {IC_SEARCH, IMG_MENU_BACKGROUND} from "../assets";
import {MenuPizza} from "../component/TabInMenu/MenuPizza";
import {MenuDessert} from "../component/TabInMenu/MenuDessert";
import {MenuAppetizer} from "../component/TabInMenu/MenuAppetizer";
import {MenuVegetable} from "../component/TabInMenu/MenuVegetable";
import {MenuKid} from "../component/TabInMenu/MenuKid";
import {MenuDrink} from "../component/TabInMenu/MenuDrink";
import {MyCartSection} from "../component/MyCart";


export const TabPanel = memo((props) => {
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
                <Box sx={{padding: 4,marginTop:8}}>
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


export const Menu = memo(function Menu() {
    const [value, setValue] = useState(1);
    const [search, setSearch] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Header/>
            <BackgroundMenu>MENU</BackgroundMenu>
            <ContentContainer>
                <TabContainer>
                    <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example"
                             TabIndicatorProps={{
                                 style: {
                                     backgroundColor: "red",
                                 },
                             }}
                    >
                        <AntTab label="Pizza" {...a11yProps(0)} />
                        <AntTab label="Khai Vị" {...a11yProps(1)} />
                        <AntTab label="Tráng miệng" {...a11yProps(2)} />
                        <AntTab label="Món chay" {...a11yProps(3)} />
                        <AntTab label="Đồ ăn trẻ em" {...a11yProps(4)} />
                        <AntTab label="Đồ uống" {...a11yProps(5)} />
                    </AntTabs>
                    <SearchBar>
                        <IconSearch src={IC_SEARCH}/>
                        <InputSearch
                            id="standard-search"
                            label="Tìm kiếm..."
                            type="search"
                            variant="standard"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                disableUnderline: true, // <== added this
                            }}
                        />
                    </SearchBar>
                    <TabPanel value={value} index={0}>
                        <MenuPizza search={search}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MenuAppetizer search={search}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <MenuDessert search={search}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <MenuVegetable search={search}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <MenuKid search={search}/>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <MenuDrink search={search}/>
                    </TabPanel>
                </TabContainer>
                <MyCartSection/>
            </ContentContainer>

        </Container>
    )
})
const Container = styled(Box)`
  margin-top: 48px;
  width: 100%;
  display: flex;
  flex: 1;
  background-color: black;
  justify-content: center;
  flex-direction: column;
`
const BackgroundMenu = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-image: url(${IMG_MENU_BACKGROUND});
  justify-content: center;
  font-size: 32px;
  color: white;
`

const ContentContainer = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #E2D8D8;
  padding-left: 40px;
  padding-right: 12px;
  justify-content: space-between;
  padding-bottom: 120px;
`
const TabContainer = styled(Box)`
  background-color: #FFFBFB;
  border-bottom-width: 1px;
  border-color: #EC393E;
  width: 68%;
  height: 600px;
  border-radius: 25px;
  position: relative;
  margin-top: 12px;
`
const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#1890ff',
    },
});

const AntTab = styled(Tab)({
    color: 'rgba(0,0,0,0.85)',
    '&:hover': {
        color: '#EC393E'
    },
    '&.Mui-selected': {
        color: '#EC393E'
    },
})
const SearchBar = styled(Box)`
  width: 30%;
  background-color: white;
  display: flex;
  align-items: center;
  padding-left: 12px;
  border-radius: 24px;
  box-shadow: -5px -4px 8px 2px rgba(158, 158, 158, 0.55);
  -webkit-box-shadow: -5px -4px 8px 2px rgba(158, 158, 158, 0.55);
  -moz-box-shadow: -5px -4px 8px 2px rgba(158, 158, 158, 0.55);
  margin-top: 12px;
  position: absolute;
  right: 8px;

`
const IconSearch = styled('img')`
  width: 16px;
  height: 16px;
`
const InputSearch = styled(TextField)`
  align-self: center;
  font-size: 12px;
  padding-bottom: 12px;
  margin-left: 8px;
`


// const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
//     textTransform: 'none',
//     minWidth: 0,
//     marginRight: theme.spacing(1),
//     color: 'rgba(0, 0, 0, 0.85)',
//     '&:hover': {
//         color: '#40a9ff',
//         opacity: 1,
//     },
//     '&.Mui-selected': {
//         color: '#1890ff',
//     },
//     '&.Mui-focusVisible': {
//         backgroundColor: '#d1eaff',
//     },
// }));

const MyCart = styled(Box)`
  width: 30%;
  background-color: white;
  border-radius: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  height: 600px;

`