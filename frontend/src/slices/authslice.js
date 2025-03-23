import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token')? localStorage.getItem('token') : null,
    loading: false
};

const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setToken, setLoading} = authslice.actions;
export default authslice.reducer;