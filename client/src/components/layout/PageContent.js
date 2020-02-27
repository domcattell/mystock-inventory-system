import React from 'react';
import '../../styles/GlobalStyles.scss';

const PageContent = (props) => {
    return (
        <div className={`pageContent ${props.className}`}>
            {props.children}
        </div>
    );
}

export default PageContent;
