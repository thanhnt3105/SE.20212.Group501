import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllKids = createAsyncThunk('kids/fetchAllKids', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_kid.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const kidSlice = createSlice({
    name: 'kids',
    initialState: initialState,
    reducers: {
        updateKid(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
        },
        add1Kid(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Kid(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllKids.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllKids.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllKids.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default kidSlice.reducer;
export const {updateKid,add1Kid,delete1Kid} = kidSlice.actions;
