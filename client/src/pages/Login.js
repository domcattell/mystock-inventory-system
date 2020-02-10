import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';

const Login = (props) => {

    const [user, handleChange, reset] = useRegisterInput("")
    const {loginUser, currentUser, message, isAuthenticated, logoutUser} = useContext(AuthContext)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user)
        reset();
    }


    const logout = () => {
        logoutUser()
    }

    console.log(message)

    return (
        <div>
            <h1>{currentUser}</h1>
            <h2>{message}</h2>
            <form action="" onSubmit={handleSubmit} >
                <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete="username" placeholder="username"/>
                <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete="password" placeholder="password"/>
                <input name="loginBtn" type="submit" value="Login"/>
            </form>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Login;
