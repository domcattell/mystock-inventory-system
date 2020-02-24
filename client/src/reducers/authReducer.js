import { CHECK_AUTH_ERROR, CLEAR_MESSAGES, USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, CHECK_USERNAME } from '../actions/types'

const reducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authLoading: false,
                currentUser: action.payload.currentUser,
                msg: action.payload,
                isAuthenticated: true
            }
            
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                authLoading: false,
                currentUser: action.payload.currentUser,
            }

        case USER_LOADING: {
            return {
                ...state,
                authLoading: true,
            }
        }

        case CHECK_USERNAME: {
            return {
                ...state,
                msg: action.payload
            }
        }

        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                authLoading: false,
                msg: action.payload,
                error: true
            }
        
        case CHECK_AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                authLoading: false
            }

        case CLEAR_MESSAGES:
            return {
                ...state,
                msg: "",
                error: false
            }
            
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                authLoading: false,
                currentUser: null,
                token: null,
            }
    }
}

export default reducer