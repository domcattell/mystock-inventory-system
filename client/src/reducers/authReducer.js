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
                token: localStorage.getItem('token')
            }
            
        case USER_LOADED:
            return {
                ...state,
                authLoading: false,
                currentUser: action.payload.currentUser,
                token: localStorage.getItem('token')
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
                authLoading: false,
                msg: action.payload,
                error: true
            }
        
        case CHECK_AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                authLoading: false,
                msg: action.payload,
                token: null
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
                authLoading: false,
                currentUser: null,
                token: null,
            }
    }
}

export default reducer