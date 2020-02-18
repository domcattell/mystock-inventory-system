import React from 'react';

import '../styles/Widget.scss'

const Widget = (props) => {
    return (
        <div className="WidgetContainer">
            <div className="widgetTitle">
                <i class="fas fa-chart-bar"></i>
                <h5>{props.title}</h5>
            </div>
            <div className="widgetContent">
                <p>{props.content}</p>
            </div>
        </div>
    );
}

export default Widget;
