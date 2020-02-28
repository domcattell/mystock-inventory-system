import React, {useContext, useEffect} from 'react';

import RegisterForm from '../components/RegisterForm';

import AuthPageContainer from '../components/layout/AuthPageContainer';

import '../styles/Register.scss';


const Register = (props) => {
    return (
        <AuthPageContainer>
            <RegisterForm history={props.history}/>
        </AuthPageContainer>
    );
}

export default Register;
