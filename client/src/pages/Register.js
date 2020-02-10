import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';


const Register = () => {

    const [newUser, handleChange, reset] = useRegisterInput("")
    const {registerUser, checkUsername, message, errorMessage} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(newUser)
        reset();
    }

    useEffect(() => {
        checkUsername(newUser) 
    },[newUser])
        
    console.log(message)

    return (
        <div>
            <h2>{message}</h2>
            <h2>{errorMessage}</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username"/>
                <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password"/>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default Register;
