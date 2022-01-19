import {createSlice} from '@reduxjs/toolkit';
  
  const initialState= {
    value: false
  };
  
  export const socialsSlice = createSlice({
    name: 'socials',
    initialState,
    reducers: {
      changeByUserSocials: state => {
        state.value = !state.value;
      }
    },
  });
  export const {
    changeByUserSocials
  } = socialsSlice.actions;
  
  export const selectSocialsSlice = (state) => state.socials.value;
  
  export default socialsSlice.reducer;