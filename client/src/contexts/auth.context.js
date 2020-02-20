import React, { createContext, useReducer, useEffect } from 'react';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, CHECK_USERNAME, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types'
import authReducer from '../reducers/authReducer'
import axios from 'axios';
import authToken from '../helpers/authToken'

export const AuthContext = createContext()

console.log(axios.defaults.headers.common['x-auth-token'])

export const AuthProvider = (props) => {

    const initialState = {
        fetchingUser: false,
        message: null,
        errorMessage: null,
        isAuthenticated: false,
        token: localStorage.getItem('token'),
        currentUser: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const userLoading = () => {
        dispatch({
            type: USER_LOADING
        })
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
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const loginUser = async (user) => {
        const config = {
            header: {
                'Content-Type:': 'application/json'
            }
        }
        try {
            const res = await axios.post("/api/login", user, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        }
    }

    const registerUser = async (newUser) => {
        try {
            const res = await axios.post("/api/register", newUser)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
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
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        }
    }

    const logoutUser = () => dispatch({type: LOGOUT_SUCCESS})
    
    console.log(state.isAuthenticated)

    return (
        <AuthContext.Provider value={{registerUser, userLoading, logoutUser, loadUser, checkUsername, loginUser, currentUser: state.currentUser, isAuthenticated: state.isAuthenticated, message: state.message, errorMessage: state.errorMessage, fetchingUser: state.fetchingUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}
