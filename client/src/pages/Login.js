import React  from 'react';

import LoginForm from '../components/LoginForm';
import AuthPageContainer from '../components/layout/AuthPageContainer';

const Login = (props) => {
    return ( 
        <AuthPageContainer>
           <LoginForm history={props.history}/>
        </AuthPageContainer>
    ); 
}

export default Login;
