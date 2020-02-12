import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context'
import useRegisterInput from '../hooks/useRegisterInput';
import "../styles/Login.scss"
import {Link} from 'react-router-dom'


const Login = (props) => {

    const [user, handleChange, reset] = useRegisterInput("")
    const { loginUser, currentUser, message, isAuthenticated, logoutUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(user)
        reset();
        props.history.push("/products/all")
    }

    const logout = () => {
        logoutUser()
    }

    return (
        <div className="Login-root">
            <div className="Login-logo">
                <h1>myStock <span>Inventory System</span></h1>
            </div>
            <div className="Login-form-wrapper">
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
