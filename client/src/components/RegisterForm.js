import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {AuthContext} from '../contexts/auth.context'

import useRegisterInput from '../hooks/useRegisterInput';

import '../styles/RegisterForm.scss'

const RegisterForm = (props) => {
    const [newUser, handleChange] = useRegisterInput("")
    const {registerUser, clearMessages, checkUsername, msg, error, token} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault(); 
        registerUser(newUser)
    }

    useEffect(() => {
        checkUsername(newUser)

        return () => {
            clearMessages()
        }
    },[newUser])

    console.log(msg)

    return (
        <div className="RegisterFormWrapper"> 
        <form className="RegisterForm" onSubmit={handleSubmit} > 
            <h4>Register</h4>
            <div className="RegisterUsernameCheck">
            <p>Username available?</p>
            <i className={msg.userTaken ? "fas fa-times-circle" : "fas fa-check-circle"} style={{color: msg.userTaken ? "lightcoral" : "lightgreen"}}></i>
            </div>
            <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username" required/>
            <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password" required/>
            <input type="submit" value="Create" disabled={msg.userTaken}/>
            {msg.created && <p className="AccountCreated">Account created. <Link to="/login">Please login</Link></p>}
        </form>
    </div>
    );
}

export default RegisterForm;
