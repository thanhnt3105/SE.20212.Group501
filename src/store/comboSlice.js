import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const axios = require('axios');
export const fetchAllCombos = createAsyncThunk('combos/fetchAllCombos', async () =>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/combo.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const comboSlice = createSlice({
    name: 'combos',
    initialState: {
        ids:[],
        entities:{},
        fetchingStatus: 'INITIAL'
    },
    reducers: {
        add1Combo(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Combo(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllCombos.pending, (state, action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllCombos.fulfilled, (state, action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllCombos.rejected, (state, action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default comboSlice.reducer;
export const {add1Combo, delete1Combo} = comboSlice.actions;