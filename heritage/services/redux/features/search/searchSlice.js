import {createSlice} from '@reduxjs/toolkit';
  
  const initialState= {
    value: false
  };
  
  export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      changeInSearchBarByUser: state => {
        state.value = !state.value;
      },
      changeQuery: (state, action) => {
        state.value = !state.value;
      }
    },
  });
  export const {
    changeInSearchBarByUser
  } = searchSlice.actions;
  
  export const selectSearchUserSlice = (state) => state.search.value;
  
  export default searchSlice.reducer;