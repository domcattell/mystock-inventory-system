import React from 'react';

import RegisterForm from '../components/RegisterForm';

import AuthPageContainer from '../components/layout/AuthPageContainer';

const Register = (props) => {
    return (
        <AuthPageContainer>
            <RegisterForm history={props.history}/>
        </AuthPageContainer>
    );
}

export default Register;
