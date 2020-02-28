import React, {useContext, useEffect} from 'react';

import {AuthContext} from '../contexts/auth.context';

import RegisterForm from '../components/RegisterForm';

import AuthPageContainer from '../components/layout/AuthPageContainer';

import useRegisterInput from '../hooks/useRegisterInput';

import '../styles/Register.scss';


const Register = (props) => {
    return (
        <AuthPageContainer>
            <RegisterForm history={props.history}/>
        </AuthPageContainer>
    );
}

export default Register;
