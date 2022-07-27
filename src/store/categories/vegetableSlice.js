import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllVegetables = createAsyncThunk('vegetables/fetchAllVegetables', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_vegetarian.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const vegetableSlice = createSlice({
    name: 'vegetables',
    initialState: initialState,
    reducers: {
        updateVegetable(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.newItem;
        },
        add1Vegetable(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Vegetable(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllVegetables.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllVegetables.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllVegetables.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default vegetableSlice.reducer;
export const {updateVegetable,add1Vegetable,delete1Vegetable} = vegetableSlice.actions;
