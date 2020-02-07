import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types'

const reducer = (state, action) => {
    switch(action.type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                fetchingUser: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isFetching: false
            }
    }
}

export default reducer