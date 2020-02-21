import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';
import '../styles/Register.scss';


const Register = () => {

    const [newUser, handleChange, reset] = useRegisterInput("")
    const {registerUser, clearMessages, checkUsername, msg} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault(); 
        registerUser(newUser)
        console.log(msg)
    }

    useEffect(() => {
        checkUsername(newUser)
    },[newUser])

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username" required/>
                <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password" required/>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default Register;
