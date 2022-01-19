import {configureStore} from '@reduxjs/toolkit';
import promotionsReducer from './features/promotions/promotionsSlice';
import socialsReducer from './features/socials/socialsSlice';
import searchReducer from './features/search/searchSlice';

export const store = configureStore({
    reducer: {
        promotions: promotionsReducer,
        socials: socialsReducer,
        search: searchReducer
    },
});