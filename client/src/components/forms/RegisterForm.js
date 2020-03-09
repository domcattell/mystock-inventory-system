import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext} from '../../contexts/auth.context';

import useRegisterInput from '../../hooks/useRegisterInput';

import '../../styles/forms/RegisterForm.scss';

const RegisterForm = (props) => {
    const [newUser, handleChange] = useRegisterInput("");
    const {registerUser, clearMessages, checkUsername, msg, token} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        registerUser(newUser);
    };

    useEffect(() => {
        checkUsername(newUser);

        return () => {
            clearMessages();
        };
    },[newUser]);

    return (
        <div className="RegisterForm"> 
            <form className="RegisterForm__form" onSubmit={handleSubmit} > 
                <h4 className="RegisterForm__header">Create an account</h4>
                <div className="RegisterForm__check-usrname">
                    <p className="RegisterForm__usrname-status">Username available?</p>
                    <i className={msg.userTaken ? "fas fa-times-circle" : "fas fa-check-circle"} style={{color: msg.userTaken ? "lightcoral" : "lightgreen"}}></i>
                </div>
                <input className="RegisterForm__input" type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username" required/>
                <input className="RegisterForm__input" type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password" required/>
                <input className="RegisterForm__register-btn" type="submit" value="Create" disabled={msg.userTaken}/>
                {msg.created && <p className="RegisterForm__created">Account created. <Link to="/login">Please login</Link></p>}
            </form>
        </div>
    );
};

export default RegisterForm;
