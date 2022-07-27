import { createSlice } from "@reduxjs/toolkit";
const cartExtraSlice = createSlice({
    name: 'cartExtras',
    initialState: {
        'kid':{
            ids: [],
            entities: {}
        },
        'dessert':{
            ids: [],
            entities: {}
        },
        'appetizer':{
            ids: [],
            entities: {}
        },
        'drink':{
            ids: [],
            entities: {}
        },
        'vegetable':{
            ids: [],
            entities: {}
        }
    },
    reducers: {
        itemAdded(state, action){
            const extraId = action.payload.extraId;
            const category = action.payload.category;
            const existingId = state[category].ids.find(id => id === extraId);
            if(existingId !== undefined){
                state[category].entities[extraId].number += action.payload.number;
                if(state[category].entities[extraId].number > 10) state[category].entities[extraId].number = 10;
                state[category].entities[extraId].total += action.payload.total;
            }else{
                state[category].ids.push(extraId);
                state[category].entities[extraId] = action.payload
            }
        },
        itemRemoved(state, action){
            const id = action.payload.id;
            const category = action.payload.category;
            const index = state[category].ids.indexOf(id);
            if(index !== -1){
                state[category].ids.splice(index, 1);
            }
        },itemUpdated(state, action){
            const extraId = action.payload.id;
            const category = action.payload.category;
            state[category].entities[extraId].number = action.payload.number;
            state[category].entities[extraId].total = action.payload.total;
        }
    }
})
export const {itemAdded, itemRemoved, itemUpdated} = cartExtraSlice.actions;
export default cartExtraSlice.reducer;