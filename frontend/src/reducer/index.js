import { combineReducers } from '@reduxjs/toolkit';
import profileReducer from '../slices/profileslice';
import authReducer from '../slices/authslice';

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
});

export default rootReducer;
