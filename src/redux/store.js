import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './Slices/themeSlice';
export default configureStore({
    reducer:{
        theme:themeReducer
    }
})