import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice.js';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;