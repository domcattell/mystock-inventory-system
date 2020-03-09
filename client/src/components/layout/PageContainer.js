import React from 'react';
import '../../styles/GlobalStyles.scss';

const PageContainer = (props) => {
    return (
        <div className="PageContainer">
            {props.children}
        </div>
    );
}

export default PageContainer;
