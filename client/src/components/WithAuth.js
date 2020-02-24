import React, { useContext, useEffect } from 'react';
import {Redirect} from 'react-router-dom'

import { AuthContext } from '../contexts/auth.context';
import Menubar from '../components/Menubar'

export default function WithAuth(PrivateComponent) {
    return function AuthContainer() {
        const {isAuthenticated, loadUser} = useContext(AuthContext); 

        useEffect(() => {
            loadUser();
        },[])
        
        console.log(isAuthenticated)

        if (isAuthenticated) {
            return <PrivateComponent />
        } else if(!isAuthenticated) {
            return <h4>sdfsdfsdf</h4>
        }
    }
}







