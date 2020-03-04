import React from 'react';
import '../styles/CompactCardLink.scss';

const CompactCardLink = (props) => {
    return (
        <div className="CompactCardRoot">
            <h4 className="CompactCardTitle">{props.title}</h4>
            <div className="CompactCardEdit"><i class="fas fa-edit"></i></div>
            <div className="CompactCardDelete"><i className="fas fa-trash"></i></div>
        </div>
    );
}

export default CompactCardLink;
