import React, {useContext, useEffect, memo} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext, AuthActionsContext} from '../../contexts/auth.context';

import useRegisterInput from '../../hooks/useRegisterInput';

import '../../styles/forms/RegisterForm.scss';

const RegisterForm = () => {
    const [newUser, handleChange] = useRegisterInput("");
    const { authMsg } = useContext(AuthContext);
    const { registerUser, clearAuthMessages, checkUsername, } = useContext(AuthActionsContext);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        registerUser(newUser);
    };

    useEffect(() => {
        checkUsername(newUser);
        return () => {
            clearAuthMessages();
        };
    },[newUser]);

    return (
        <div className="RegisterForm"> 
            <form className="RegisterForm__form" onSubmit={handleSubmit} > 
                <h4 className="RegisterForm__header">Create an account</h4>
                <div className="RegisterForm__check-usrname">
                    <p className="RegisterForm__usrname-status">Username available?</p>
                    <i className={authMsg.userTaken ? "fas fa-times-circle" : "fas fa-check-circle"} style={{color: authMsg.userTaken ? "lightcoral" : "lightgreen"}}></i>
                </div>
                <input className="RegisterForm__input" type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username" required/>
                <input className="RegisterForm__input" type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password" required/>
                <input className="RegisterForm__register-btn" type="submit" value="Create" disabled={authMsg.userTaken}/>
                {authMsg.created && <p className="RegisterForm__created">Account created. <Link to="/login">Please login</Link></p>}
            </form>
        </div>
    );
}

export default memo(RegisterForm);
