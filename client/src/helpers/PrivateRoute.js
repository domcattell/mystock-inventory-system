import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { token } = useContext(AuthContext);

        return (
            <Route {...rest}
                render={props => (
                   token ? <Component {...props}/> : <Redirect to="/login" />           
                )}
            />
        );  
}

export default PrivateRoute;  