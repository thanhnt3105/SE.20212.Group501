import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import pizzaReducer from "./categories/pizzaSlice.js";
import cartReducer from "./cartSlice";
import comboReducer from "./comboSlice";
import dessertSlice from "./categories/dessertSlice";
import drinkSlice from "./categories/drinkSlice";
import kidSlice from "./categories/kidSlice";
import vegetableSlice from "./categories/vegetableSlice";
import appetizerSlice from "./categories/appetizerSlice";
import cartExtraReducer from './cartExtraSlice';
import cartComboReducer from './cartComboSlice';
import orderSlice from './orderSlice';
import {combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// storage.removeItem('persist:root');
const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    pizzas: pizzaReducer,
    cart: cartReducer,
    cartExtras: cartExtraReducer,
    cartCombos: cartComboReducer,
    combos: comboReducer,
    desserts: dessertSlice,
    drinks: drinkSlice,
    kids: kidSlice,
    vegetables: vegetableSlice,
    appetizers: appetizerSlice,
    orders: orderSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store =  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
});
export const persistor = persistStore(store);