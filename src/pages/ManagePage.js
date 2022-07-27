import React, {memo, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {IC_SEARCH, IMG_MENU_BACKGROUND} from "../assets";
import {Header} from "../component/Header";
import {MenuPizza} from "../component/TabInMenu/MenuPizza";
import {MenuAppetizer} from "../component/TabInMenu/MenuAppetizer";
import {MenuDessert} from "../component/TabInMenu/MenuDessert";
import {MenuVegetable} from "../component/TabInMenu/MenuVegetable";
import {MenuKid} from "../component/TabInMenu/MenuKid";
import {MenuDrink} from "../component/TabInMenu/MenuDrink";
import {Tab, Tabs, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {TabPanel} from "./Menu";
import {ComboManage, PizzaManage} from "../component/ManageCategory";

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


export const ManagePage = memo(function ManagePage() {
    const [value, setValue] = useState(1);
    const [search, setSearch] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Header/>
            <BackgroundMenu>MENU MANAGEMENT</BackgroundMenu>
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
                        <AntTab label="Combo" {...a11yProps(6)} />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <PizzaManage category= {'pizza'} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PizzaManage category= {'appetizer'} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PizzaManage category= {'dessert'} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <PizzaManage category= {'vegetable'} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <PizzaManage category= {'kid'} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <PizzaManage category= {'drink'} />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <ComboManage />
                    </TabPanel>
                </TabContainer>
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
  z-index: 100;
`
const TabContainer = styled(Box)`
  background-color: #FFFBFB;
  border-bottom-width: 1px;
  border-color: #EC393E;
  width: 100%;
  border-radius: 25px;
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
