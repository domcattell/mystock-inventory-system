import React, {useContext, useEffect, useState} from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'

const Routes = (props) => {
    
    return (
        <div>
            <Switch>
                <Route exact path ="/register" render={() => <Register />} />
                <Route exact path ="/login" render={(routeProps) => <Login {...routeProps} />} />
                <Route exact path="/" render={() => <h1>Hello</h1>} />
        </Switch>
        </div>
    );
}

export default Routes;
