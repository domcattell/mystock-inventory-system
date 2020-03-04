import React from 'react';

import '../../styles/GlobalStyles.scss';

const GridContainer = (props) => {
    return (
        <div className="GridContainer">
            {props.children}
        </div>
    );
}

export default GridContainer; 
