import React, { createContext, useReducer, useCallback } from 'react';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, CHECK_USERNAME, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types'
import authReducer from '../reducers/authReducer'
import axios from 'axios';

export const AuthContext = createContext()

const authToken = (token) => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export const AuthProvider = (props) => {

    const initialState = {
        fetchingUser: true,
        error: null,
        isAuthenticated: false,
        token: localStorage.getItem('token'),
        currentUser: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async (newUser) => {
        try {
            const res = await axios.post("/api/register", newUser)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg
            })
        } 
    }

    const loadUser = async () => {
        if(localStorage.token) {
            authToken(localStorage.token)
        }
        
        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            console.log(res.data)
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const loginUser = async (user) => {
        try {
            const res = await axios.post("/api/login", user)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const checkUsername = async (user) => {
        try {
            const res = await axios.post("/api/register/validation", user)
            dispatch({
                type: CHECK_USERNAME,
                payload: res.data
            })
        } catch(err) {
            console.log(err)
        }
    }

    const logoutUser = () => dispatch({type: LOGOUT_SUCCESS})

    return (
        <AuthContext.Provider value={{registerUser, logoutUser, loadUser, checkUsername, loginUser, currentUser: state.currentUser, isAuthenticated: state.isAuthenticated, error: state.error}}>
            {props.children}
        </AuthContext.Provider>
    )
}
