import React, {useContext, useEffect, useState} from 'react';
import { Route, NavLink, Switch, Redirect, withRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {AuthContext} from '../contexts/auth.context';
import Menubar from '../components/Menubar'

const Routes = (props) => {
    const {isAuthenticated, loadUser} = useContext(AuthContext);

    console.log(isAuthenticated);
    
    return (
        <div>
        <Switch>
                {isAuthenticated && <Redirect to="/dashboard" />}
                <Route exact path ="/register" render={() => <Register />} />
                <Route exact path ="/login" render={(routeProps) => <Login {...routeProps}/>} />
                <Route exact path="/" render={() => <Redirect to="/login" />} />
        </Switch>
        </div>
    );
}

export default withRouter(Routes);
