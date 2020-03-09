import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';

import { AuthContext } from '../../contexts/auth.context';

import useRegisterInput from '../../hooks/useRegisterInput';

import '../../styles/forms/LoginForm.scss';

const LoginForm = (props) => {

    const [user, handleChange, reset] = useRegisterInput("");
    const { loginUser, clearMessages, msg, token} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user);
        reset();
        clearMessages();
    }

    useEffect(() => {
        return () => {
            clearMessages()
        };
    },[]);

    token && props.history.push("/dashboard");

    return (
        <div className={msg ? "LoginForm LoginForm--shake" : "LoginForm"}>
            {msg && <p className="LoginForm__error-msg">{msg.error}</p>} 
            <form className="LoginForm__form" onSubmit={handleSubmit} >
                <h4 className="LoginForm__header">Please Login</h4>
                <input className="LoginForm__input" type="text" name="username" onChange={handleChange} value={user.username} autoComplete="username" placeholder="username" />
                <input className="LoginForm__input" type="password" name="password" onChange={handleChange} value={user.password} autoComplete="password" placeholder="password" />
                <input className="LoginForm__login-btn" name="loginBtn" type="submit" value="Login" />
            </form>
            <p className="LoginForm__register">Not registered? Create an account <Link to="/register">Here</Link></p>
        </div>
    );
};

export default LoginForm;
