import {configureStore} from '@reduxjs/toolkit';
import promotionsReducer from './features/promotions/promotionsSlice';
import socialsReducer from './features/socials/socialsSlice';

export const store = configureStore({
    reducer: {
        promotions: promotionsReducer,
        socials: socialsReducer
    },
});