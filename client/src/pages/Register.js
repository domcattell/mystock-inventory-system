import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';


const Register = () => {

    const [newUser, handleChange, reset] = useRegisterInput("")
    const {registerUser} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(newUser)
        reset();
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={newUser.username} placeholder="username"/>
                <input type="password" name="password" onChange={handleChange} value={newUser.password} placeholder="password"/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Register;
