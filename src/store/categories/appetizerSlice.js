import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllAppetizers = createAsyncThunk('appetizers/fetchAllAppetizers', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_appetizer.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const appetizerSlice = createSlice({
    name: 'appetizers',
    initialState: initialState,
    reducers: {
        updateAppetizer(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
        },
        add1Appetizer(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Appetizer(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllAppetizers.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllAppetizers.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllAppetizers.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default appetizerSlice.reducer;
export const {updateAppetizer,delete1Appetizer,add1Appetizer} = appetizerSlice.actions;
