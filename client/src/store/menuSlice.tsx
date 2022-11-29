
import {createSlice}from '@reduxjs/toolkit'

//url 
const menuSlice = createSlice({
    name:'menu',
    initialState:{menu:"search"},
    reducers:{
      userInfo:(state)=>{state.menu = "userInfo"},
      search:(state)=>{state.menu = "search"}
    }
  })

  export default menuSlice