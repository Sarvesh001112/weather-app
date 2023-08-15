import {createSlice} from '@reduxjs/toolkit';
export const themeSlice=createSlice({
    name:"theme",
    initialState:{
        themeColor:"#FFFFFF"
    },
    reducers:{
        changeToLight:(state)=>{
            state.themeColor="#FFFFFF"
        },
        changeToDark:(state)=>{
            state.themeColor="#000000"
        }
    }
});

export const {changeToDark,changeToLight}=themeSlice.actions;
export default themeSlice.reducer;