import React from 'react';
import '../../styles/GlobalStyles.scss';

const PageContainer = (props) => {
    return (
        <div className="pageContainer">
            {props.children}
        </div>
    );
}

export default PageContainer;
