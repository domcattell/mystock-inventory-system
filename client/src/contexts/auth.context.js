import React, { createContext, useReducer, useCallback } from 'react';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types'
import authReducer from '../reducers/authReducer'
import axios from 'axios';

export const AuthContext = createContext()

export const AuthProvider = (props) => {

    const initialState = {
        fetchingUser: true,
        userError: false,
        isAuthenticated: false,
        user: null
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
            console.log(err)
        } 
    }

    const loginUser = async (user) => {
        try {
            const res = await axios.post("/api/login", user)
            if(res.status === 200) {
                dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            console.log(res.data)
            } 
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{registerUser, loginUser, user: state.user}}>
            {props.children}
        </AuthContext.Provider>
    )
}
