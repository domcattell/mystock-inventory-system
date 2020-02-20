import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';


const Register = () => {

    const [newUser, handleChange] = useRegisterInput("")
    const {registerUser, clearMessages, checkUsername, msg} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault(); 
        registerUser(newUser)
    }

    useEffect(() => {
        checkUsername(newUser)
    },[newUser])
    
    return (
        <div onClick={clearMessages}>
            <h4>{msg.info}</h4>
            <h4>{msg.error}</h4>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username" required/>
                <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password" required/>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default Register;
