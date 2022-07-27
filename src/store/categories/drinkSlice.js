import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllDrinks = createAsyncThunk('drinks/fetchAllDrinks', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_drink.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const drinkSlice = createSlice({
    name: 'drinks',
    initialState: initialState,
    reducers: {
        updateDrink(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
        },
        add1Drink(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Drink(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }

    },
    extraReducers(builders){
        builders
        .addCase(fetchAllDrinks.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllDrinks.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllDrinks.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default drinkSlice.reducer;
export const {updateDrink,add1Drink,delete1Drink} = drinkSlice.actions;
