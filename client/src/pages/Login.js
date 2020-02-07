import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';


const Login = (props) => {

    const [user, handleChange, reset] = useRegisterInput("")
    const {loginUser} = useContext(AuthContext)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user)
        reset();
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit} >
                <input type="text" name="username" onChange={handleChange} value={user.username} autocomplete="username" placeholder="username"/>
                <input type="password" name="password" onChange={handleChange} value={user.password} autocomplete="password" placeholder="password"/>
                <input name="loginBtn" type="submit" value="Login"/>
            </form>
        </div>
    );
}

export default Login;
