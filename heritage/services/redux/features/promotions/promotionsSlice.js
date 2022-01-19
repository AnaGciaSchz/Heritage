import {createSlice} from '@reduxjs/toolkit';
  
  const initialState= {
    valueUser: false
  };
  
  export const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
      changeByUserPromotions: state => {
        state.valueUser = !state.valueUser;
      }
    },
  });
  export const {
    changeByUserPromotions
  } = promotionsSlice.actions;
  
  export const selectPromotionsUserSlice = (state) => state.promotions.valueUser;
  
  export default promotionsSlice.reducer;