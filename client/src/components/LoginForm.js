import React, { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';
import "../styles/Login.scss"
import {Link} from 'react-router-dom'
import '../styles/LoginFormStyles.scss'

const LoginForm = () => {

    const [user, handleChange, reset] = useRegisterInput("")
    const { loginUser, token, clearMessages, userLoading, msg, error, checkAuth, isAuthenticated, fetchingUser} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user);
        reset();
    }

    return (
        <div className={error ? "Login-form-wrapper shake" : "Login-form-wrapper"}>
        <div className="loginMessage">
            {error && <p className="loginError">{msg.error}</p>} 
        </div>
        <form className="Login-form" onSubmit={handleSubmit} >
            <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete="username" placeholder="username" />
            <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete="password" placeholder="password" />
            <input name="loginBtn" type="submit" value="Login" />
        </form>
        <h4>Not registered? Create an account <Link to="/register"><a>Here</a></Link></h4>
    </div>
    );
}

export default LoginForm;
