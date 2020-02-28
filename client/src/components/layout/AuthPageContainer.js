import React from 'react';

import '../../styles/GlobalStyles.scss'

const AuthPageContainer = (props) => {
    return (
        <div className="AuthPageContainer">
            <div className="AuthPageLogo">
                <h1>myStock <span>Inventory System</span></h1>
            </div>
            {props.children}
        </div>
    );
}

export default AuthPageContainer;
