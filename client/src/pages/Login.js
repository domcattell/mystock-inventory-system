import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';
import "../styles/Login.scss"
import {Link} from 'react-router-dom'


const Login = (props) => {

    const [user, handleChange, reset] = useRegisterInput("")
    const { loginUser, currentUser, message, isAuthenticated, loadUser, userLoading, fetchingUser,  errorMessage} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        userLoading();
        loginUser(user);
        reset();
    }

    console.log(`loading user... ${fetchingUser}`)
    console.log(isAuthenticated)
  
    return (
        <div className="Login-root">
            <div className="Login-logo">
                <h1>myStock <span>Inventory System</span></h1>
            </div>
            <div className="Login-form-wrapper">
                <h3>{message}</h3>
                <h5>{fetchingUser && "Loading"}</h5>
                <form className="Login-form" onSubmit={handleSubmit} >
                    <input type="text" name="username" onChange={handleChange} value={user.username} autoComplete="username" placeholder="username" />
                    <input type="password" name="password" onChange={handleChange} value={user.password} autoComplete="password" placeholder="password" />
                    <input name="loginBtn" type="submit" value="Login" />
                </form>
                <h4>Not registered? Create an account <Link to="/register"><a>Here</a></Link></h4>
            </div>
        </div>
    );
}

export default Login;
