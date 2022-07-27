import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const axios = require('axios')
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async() =>{
    try{
        const result = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/order.json') 
        return result.data
    }catch(err){
        console.log(err)
    }
})
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        ids: [],
        entities: {},
        fetchingStatus: 'INITIAL'
    },
    reducers:{
        addOrder(state, action){
            state.ids.push(action.payload.id)
            state.entities[action.payload.id] = action.payload.data
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchOrders.pending, (state, action)=>{
            state.fetchingStatus='LOADING'
        })
        .addCase(fetchOrders.fulfilled, (state, action)=>{
            state.entities = action.payload
            console.log(state.entities)
            state.fetchingStatus='SUCCESS'
        })
        .addCase(fetchOrders.rejected, (state, action)=>{
            state.fetchingStatus='FAILED'
        })
    }
})
export default orderSlice.reducer;
export const {addOrder} = orderSlice.actions;