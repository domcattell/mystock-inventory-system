import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, checkAuth, authLoading, token } = useContext(AuthContext);
    if(authLoading) {
        return <h4>Loading...</h4>

    } else if (isAuthenticated){
        return (
            <Route {...rest}
                onEnter={checkAuth}
                render={props => (
                    <Component {...props}/>           
                )}
            />
        );  

    } else {
        return (
            <Redirect to="/login" />
        )
    }     
}
export default PrivateRoute;
// !isAuthenticated ? <Redirect to="/login" /> : (<Component {...props}/>)