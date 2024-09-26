// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        image: null,
    },
    reducers: {
        setUser(state, action) {
            return { ...state, ...action.payload };
        },
        clearUser(state) {
            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
