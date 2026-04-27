'use client'

import { createSlice } from "@reduxjs/toolkit";

export const StatusFilters = {
    All: 'All',
    Active: 'Active',
    Completed: 'Completed',
}


export type StatusFilter = typeof StatusFilters[keyof typeof StatusFilters];





const filterSlice = createSlice({name:"filter",initialState:{
    filterStatus:StatusFilters.All
},reducers:{
    changeFilter:(state,action)=>{
        
        state.filterStatus = action.payload

    }
}})
export const {changeFilter} = filterSlice.actions;
export default filterSlice.reducer