import React from 'react';
import '../../styles/GlobalStyles.scss';

const PageHeader = (props) => {
    return (
        <div className="pageHeader">
            <h3>{props.title}</h3>
        </div>
    );
}

export default PageHeader;
