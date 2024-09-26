import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// Actions to fetch, create, update, and delete users
export const fetchUsers = (searchTerm = '') => async (dispatch) => {
    try {
        const response = await axios.get(`/api/users/?search=${searchTerm}`);
        dispatch(setUsers(response.data));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const createUser = (user) => async (dispatch) => {
    try {
        const response = await axios.post('/api/users/', user);
        dispatch(addUser(response.data));
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/users/${id}/`, user);
        dispatch(editUser(response.data));
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/users/${id}/`);
        dispatch(removeUser(id));
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
