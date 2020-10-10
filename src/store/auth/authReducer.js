import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, USER_LOGIN, USER_LOGOUT, USER_TYPE_CREDENTIAL } from './authTypes';


const userName = localStorage.getItem('name')
const password = localStorage.getItem('password')
const logStatus = localStorage.getItem('logStatus')
const userType = localStorage.getItem('userType')
const userId = localStorage.getItem('userId')
const userConfirmed = localStorage.getItem('userConfirmed')


const initialState = {
    users: [],
    error: '',
    userName: userName === null ? '' : userName,
    password: password === null ? '' : password,
    logStatus: logStatus === null ? false : logStatus,
    userType: userType === null ? '' : userType,
    userId: userType === null ? '' : userId,
    userConfirmed: userConfirmed === null ? false : userConfirmed,
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
        return {
            ...state,
        }
        case FETCH_USERS_SUCCESS:
        return {
            ...state,
            users: action.payLoad,
            error: '',
        }
        case FETCH_USERS_FAILURE:
        return {
            ...state,
            users: [],
            error: action.payLoad
        }
        case USER_TYPE_CREDENTIAL:
        return {
            ...state,
            userName: localStorage.getItem('name') === null ? '' : localStorage.getItem('name'),
            password: localStorage.getItem('password') === null ? '' : localStorage.getItem('password'),
        }
        case USER_LOGIN:
        for (let i = 0; i < state.users.length; i++) {
            if(state.userName === state.users[i].name && state.password === state.users[i].password) {
                localStorage.setItem('logStatus', true)
                localStorage.setItem('userType', state.users[i].type)
                localStorage.setItem('userId', state.users[i]._id)
                localStorage.setItem('userConfirmed', state.users[i].confirmed)
                localStorage.setItem('newUserRequests', state.users.filter(x => x.confirmed !== true).length)
                return {
                    ...state,
                    logStatus: true,
                    userType: state.users[i].type,
                    userId: state.users[i]._id,
                    userConfirmed: state.users[i].confirmed,
                }
            }
        }
        return {
            ...state,
        }
        case USER_LOGOUT:
            let keysToRemove = ["name", "password", "logStatus", "userType", "userId", "userConfirmed", "newUserRequests"]
            keysToRemove.forEach(k =>
                localStorage.removeItem(k)
            )
        return {
            ...state,
            users: [],
            userName: '',
            password: '',
            logStatus: false,
            userType: '',
            userId: '',
            userConfirmed: false,
        }
        default:
            return state;
    }
}

export default userReducer;