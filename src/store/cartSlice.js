import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        ids: [],
        entities: {},
        nextId: 0
    },
    reducers: {
        itemAdded(state, action){
            state.ids = [...state.ids, state.nextId];
            state.entities[state.nextId] = action.payload;
            state.nextId += 1;
        },
        itemRemoved(state, action){
            const id = action.payload;
            const index = state.ids.indexOf(id);
            if(index !== -1){
                state.ids.splice(index, 1);
            }
        },itemUpdated(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.data;
        }
    }
})
export const {itemAdded, itemRemoved, itemUpdated} = cartSlice.actions;
export default cartSlice.reducer;