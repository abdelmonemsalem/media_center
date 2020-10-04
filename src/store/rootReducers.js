import { combineReducers } from 'redux';
import favItemReducer from './favItem/favItemReducer';
import authReducer from './auth/authReducer'


const rootReducer = combineReducers({
    favItemReducer,
    user: authReducer
});

export default rootReducer;