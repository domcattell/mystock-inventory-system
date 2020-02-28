import React from 'react';

import '../../styles/GridContainer.scss';

const GridContainer = (props) => {
    return (
        <div className="GridContainer">
            {props.children}
        </div>
    );
}

export default GridContainer; 
