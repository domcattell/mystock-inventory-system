import React from 'react';
import '../../styles/GlobalStyles.scss';

const PageHeader = (props) => {
    return (
        <div className="PageHeader">
            <h3 className="PageHeader__header">{props.title}</h3>
        </div>
    );
}

export default PageHeader;
