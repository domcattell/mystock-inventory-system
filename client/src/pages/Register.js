import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';


const Register = () => {

    const [newUser, handleChange, reset] = useRegisterInput("")
    const {registerUser, clearMessages, checkUsername, successMsg, errorMsg} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault(); 
        registerUser(newUser)
        clearMessages();
    }

    useEffect(() => {
        checkUsername(newUser)
    },[newUser])
        
    return (
        <div>
            <h4>{successMsg}</h4>
            <h4>{errorMsg}</h4>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username" required/>
                <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password" required/>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default Register;
