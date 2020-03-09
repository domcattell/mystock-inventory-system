import React from 'react';

import '../../styles/tools/Widget.scss'

const Widget = (props) => {
    return (
        <div className="Widget">
            <div className="Widget__header-container">
                <i className="fas fa-chart-bar"></i>
                <h5 className="Widget__header">{props.title}</h5>
            </div>
            <div className="Widget__content-container">
                <p className="Widget__content">{props.content}</p>
            </div>
        </div>
    );
}

export default Widget;
