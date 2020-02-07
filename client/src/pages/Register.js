import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';


const Register = () => {

    const [newUser, handleChange, reset] = useRegisterInput("")
    const {registerUser, checkUsername, error} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(newUser)
        reset();
    }

    useEffect(() => {
        checkUsername(newUser) 
    },[newUser])
        
    console.log(error)

    return (
        <div>
            <h2>{error}</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username"/>
                <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password"/>
                <input type="submit" value="Create" />
            </form>
            <button >check</button>
        </div>
    );
}

export default Register;
