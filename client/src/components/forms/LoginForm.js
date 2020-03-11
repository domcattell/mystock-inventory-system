import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';

import { AuthContext, AuthActionsContext } from '../../contexts/auth.context';

import useRegisterInput from '../../hooks/useRegisterInput';

import '../../styles/forms/LoginForm.scss';

const LoginForm = (props) => {

    const [user, handleChange, reset] = useRegisterInput("");
    const { authMsg, token } = useContext(AuthContext);
    const { loginUser, clearAuthMessages } = useContext(AuthActionsContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user);
        reset();
        clearAuthMessages();
    }

    useEffect(() => {
        return () => {
            clearAuthMessages()
        };
    },[]);

    token && props.history.push("/dashboard");

    return (
        <div className={authMsg.error ? "LoginForm LoginForm--shake" : "LoginForm"}>
            {authMsg.error && <p className="LoginForm__error-msg">{authMsg.error}</p>} 
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
