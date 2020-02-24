import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, checkAuth, authLoading, token } = useContext(AuthContext);
    
        return (
            <Route {...rest}
                onEnter={checkAuth}
                render={props => (
                    token ? <Component {...props}/> : <Redirect to="/login" />           
                )}
            />
        );  
   
}
export default PrivateRoute;
// !isAuthenticated ? <Redirect to="/login" /> : (<Component {...props}/>)