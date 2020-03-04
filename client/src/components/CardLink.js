import React, { useContext } from 'react';
import ReactLoading from 'react-loading'

import '../styles/ProductCard.scss'

const CardLink = (props) => {
    return (
        <div className={`${props.className} CardRoot ${props.fetching && "loading"}`}>
            {props.fetching ? <ReactLoading type="bars" color="gray" size="sm"/> :
            <div>
                <div className="CardName">
                    <i className="fas fa-list-ul CardIcon"></i>
                    <h4>{props.name}</h4>
                </div>
                <div className="CardDetails">
                    {props.itemOne && <h5>{props.itemOne}: {props.itemOneContent}</h5>}
                    {props.itemTwo && <h5>{props.itemTwo}: {props.itemTwoContent}</h5>}
                    {props.itemThree && <h5>{props.itemThree}: {props.itemThreeContent}</h5>}
                </div>
            </div>
            
            }
        </div>
    );
}

export default CardLink;

