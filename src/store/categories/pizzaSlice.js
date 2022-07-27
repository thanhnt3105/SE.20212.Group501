import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');

export const fetchAllPizzas = createAsyncThunk('pizzas/fetchAllPizzas', async () =>{
    try{
        const response = await axios.get('https://pizzahust-c5035-default-rtdb.firebaseio.com/menu/menu_main_courses.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const initialState = {
    ids:[],
    entities:{},
    fetchingStatus: 'INITIAL'
}
const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState: initialState,
    reducers: {
        updatePizza(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
        },
        add1Pizza(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.item;
            state.ids.push(id);
        },
        delete1Pizza(state, action){
            const deleteId = action.payload.id;
            const newIds = state.ids.filter((id) => id !== deleteId );
            state.ids = newIds;
        }
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllPizzas.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllPizzas.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllPizzas.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default pizzaSlice.reducer;
export const {updatePizza,add1Pizza, delete1Pizza} = pizzaSlice.actions;

