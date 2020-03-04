import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';
import {Link} from 'react-router-dom'
import '../styles/LoginFormStyles.scss'

const LoginForm = (props) => {

    const [user, handleChange, reset] = useRegisterInput("")
    const { loginUser, clearMessages, msg, error, token} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user);
        reset();
        clearMessages()
    }

    useEffect(() => {
        return () => {
            clearMessages()
        }
    },[])

    token && props.history.push("/dashboard")

    return (
        <div className={error ? "Login-form-wrapper shake" : "Login-form-wrapper"}>
        <div className="loginMessage">
            {error && <p className="loginError">{msg.error}</p>} 
        </div>
        <form className="Login-form" onSubmit={handleSubmit} >
            <h4>Please Login</h4>
            <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete="username" placeholder="username" />
            <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete="password" placeholder="password" />
            <input name="loginBtn" type="submit" value="Login" />
        </form>
        <p className="LoginRegisterLink">Not registered? Create an account <Link to="/register">Here</Link></p>
    </div>
    );
}

export default LoginForm;
