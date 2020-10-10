import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, USER_LOGIN, USER_LOGOUT, USER_TYPE_CREDENTIAL } from './authTypes';
import { GetUsers } from '../../API/GetData'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST   
    }
}
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payLoad: users
    }
}
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payLoad: error
    }
}
export const userTypeCredentila = () => {
    return {
        type: USER_TYPE_CREDENTIAL,
    }
}
export const userLogin = () => {
    return {
        type: USER_LOGIN,
    }
}
export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest)
        GetUsers()
        .then(response => {
            const users = response.data
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchUsersFailure(errorMsg))
        })
    }
}