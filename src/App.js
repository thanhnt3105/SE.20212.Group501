import {fetchAllPizzas} from "./store/categories/pizzaSlice";
import {fetchAllVegetables} from "./store/categories/vegetableSlice";
import {fetchAllDesserts} from "./store/categories/dessertSlice";
import {fetchAllDrinks} from "./store/categories/drinkSlice";
import {fetchAllKids} from "./store/categories/kidSlice";
import {fetchAllAppetizers} from "./store/categories/appetizerSlice";
import {fetchAllCombos} from "./store/comboSlice";
import {useDispatch} from 'react-redux';
import {useEffect} from "react";
import AuthContextProvider from "./context/AuthContext";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Box from "@mui/material/Box";
import {Home} from "./pages/Home";
import {Menu} from "./pages/Menu";
import {SaleCombos} from "./pages/SaleCombos";
import {Order} from "./pages/Order";
import {YourCart} from "./pages/YourCart";
import {CartPage} from "./pages/CartPage";
import {Login} from "./pages/Login";
import {ManagePage} from "./pages/ManagePage";
import {OrderStatistic} from "./pages/OrderStatistic";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllPizzas())
        dispatch(fetchAllVegetables())
        dispatch(fetchAllDesserts())
        dispatch(fetchAllDrinks())
        dispatch(fetchAllKids())
        dispatch(fetchAllAppetizers())
        dispatch(fetchAllCombos())
    })
    return (
        <body>
        <div className="App">
            <div style={{
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                display: 'flex',
                position: 'relative',
                minHeight: '100vh'
            }}>
        <BrowserRouter>
            <AuthContextProvider>
                <Box style={{
                    width: '100%',
                }}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/menu" element={<Menu/>}/>
                        <Route path="/combos" element={<SaleCombos/>}/>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/cart" element={<CartPage/>}/>
                        <Route exact path='/login' element ={<Login/>}/>
                        <Route path="/manage_menu" element={<ManagePage/>}/>
                        <Route  path='/order_report' element ={ <OrderStatistic/>}/>
                    </Routes>
                </Box>
            </AuthContextProvider>
        </BrowserRouter>
                </div>
        </div>
        </body>
    );
}

export default App;
