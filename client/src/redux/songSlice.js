import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name:"songs",
    initialState:{
        songs :[],
        isSongsLoading: false, 
    },
    reducers:{
        getSongsFetch:(state)=>{
            state.isSongsLoading = true;
        },
        getSongsSuccess:(state,action)=>{
            state.songs = action.payload;
            state.isSongsLoading = false;
        }
    }
})

export const {getSongsFetch,getSongsSuccess} = songSlice.actions; 
export default songSlice;