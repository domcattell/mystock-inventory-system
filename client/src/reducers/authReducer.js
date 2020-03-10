import { CHECK_AUTH_ERROR, CLEAR_MESSAGES, USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, CHECK_USERNAME } from '../actions/types'

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                loadingAuth: false,
                currentUser: action.payload.currentUser,
                token: localStorage.getItem('token'),
            }
            
        case REGISTER_SUCCESS:
            return {
                ...state,
                loadingAuth: false,
                currentUser: action.payload.currentUser,
                authMsg: action.payload.msg,
            }
    
        // checks if the user is logged and their token is still valid.
        // if neither are true, sends back to CHECK_AUTH_ERROR
        case USER_LOADED:
            return {
                ...state,
                loadingAuth: false,
                currentUser: action.payload.currentUser,
                token: localStorage.getItem('token'),
            }

        case USER_LOADING: {
            return {
                ...state,
                loadingAuth: true,
            }
        }

        case CHECK_USERNAME: {
            return {
                ...state,
                authMsg: action.payload.msg
            }
        }

        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                loadingAuth: false,
                authMsg: action.payload.msg,
                token: null
            }
        
        // token state is used for the PrivateRoute component, where it checks
        // if a token is present. Backend sends a 403 or 401 if token is invalid
        // or isn't present. This sets the token back to null, redirecting user
        // back to the login screen and sending them a session expired message.
        case CHECK_AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                loadingAuth: false,
                authMsg: action.payload.msg,
                token: null,
            }

        case CLEAR_MESSAGES:
            return {
                ...state,
                authMsg: ""
            }
            
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                loadingAuth: false,
                currentUser: null,
                token: null,
            }
    }
}

export default reducer