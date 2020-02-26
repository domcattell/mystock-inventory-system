import React, { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';
import "../styles/Login.scss"
import {Link, Redirect} from 'react-router-dom'
import LoginForm from '../components/LoginForm';

const Login = (props) => {

    const [user, handleChange, reset] = useRegisterInput("")
    const { loginUser, token, clearMessages, userLoading, msg, error, checkAuth, isAuthenticated, fetchingUser} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user);
        reset();
    }

    useEffect(() => {
        clearMessages()
        console.log("yo")
    },[])

    console.log(token)

    token && props.history.push("/dashboard")

    return ( 
        <div className="Login-root">
            <div className="Login-logo">
                <h1>myStock <span>Inventory System</span></h1>
            </div>
           <LoginForm />
        </div>
    ); 
}

export default Login;
