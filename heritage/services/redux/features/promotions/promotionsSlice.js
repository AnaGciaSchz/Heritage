import {createSlice} from '@reduxjs/toolkit';
  
  const initialState= {
    value: false
  };
  
  export const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
      changeByUserPromotions: state => {
        state.value = !state.value;
      }
    },
  });
  export const {
    changeByUserPromotions
  } = promotionsSlice.actions;
  
  export const selectPromotionsSlice = (state) => state.promotions.value;
  
  export default promotionsSlice.reducer;