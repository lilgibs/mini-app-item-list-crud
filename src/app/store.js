import { configureStore } from "@reduxjs/toolkit";
import itemReducer from '../features/itemSlice'
import userSlice from "../features/userSlice";

export default configureStore({
  reducer:{
    user: userSlice,
    items: itemReducer
  }
})