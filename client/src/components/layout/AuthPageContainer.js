import React from 'react';

import '../../styles/GlobalStyles.scss'

const AuthPageContainer = (props) => {
    return (
        <div className="AuthPageContainer">
            <div className="AuthPageContainer__logo-header">
                <h1>myStock <span className="AuthPageContainer__sub-text">Inventory System</span></h1>
            </div>
            {props.children}
        </div>
    );
}

export default AuthPageContainer;
