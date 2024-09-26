// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice'; // Import the user reducer
import adminAuthReducer from './adminAuthSlice'; // Import the adminAuth slice
import adminUserReducer from './adminUserSlice';

const store = configureStore({
  reducer: {
    user: userReducer,          // Combine your user reducer
    adminAuth: adminAuthReducer ,// Combine your adminAuth reducer
    adminUsers: adminUserReducer,

  },
});

export default store;
