import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null
}


export const netflixSlice = createSlice({
  name: 'netflix',
  initialState,
  reducers:{
    addToMovies:(state,action) =>{
      const items = state.productData.find((movie)=>(
        movie.id === action.payload.id
      ));

      if(!items){
        state.productData.push({...action.payload, liked: true})
      
      }else{
        state.productData = state.productData.filter((movie)=>(
          movie.id !== action.payload.id
        ))
      }
    },

    removeMovies: (state, action)=>{
      state.productData = state.productData.filter((movie)=>(movie.id !== action.payload))
    }
  }
});


export const {addToMovies, removeMovies} = netflixSlice.actions;
export default netflixSlice.reducer;