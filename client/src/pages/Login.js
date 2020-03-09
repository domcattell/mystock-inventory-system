import React  from 'react';

import LoginForm from '../components/forms/LoginForm';
import AuthPageContainer from '../components/layout/AuthPageContainer';

const Login = (props) => {
    return ( 
        <AuthPageContainer>
           <LoginForm history={props.history}/>
        </AuthPageContainer>
    ); 
}

export default Login;
