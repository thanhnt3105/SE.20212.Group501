import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllDesserts = createAsyncThunk('desserts/fetchAllDesserts', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_dessert.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const dessertSlice = createSlice({
    name: 'desserts',
    initialState: initialState,
    reducers: {
        updateDessert(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
        },
        add1Dessert(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Dessert(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllDesserts.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllDesserts.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllDesserts.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default dessertSlice.reducer;
export const {updateDessert,add1Dessert,delete1Dessert} = dessertSlice.actions;
