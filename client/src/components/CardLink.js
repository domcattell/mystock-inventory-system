import React, { useContext } from 'react';
import ReactLoading from 'react-loading'

import '../styles/ProductCard.scss'

const CardLink = (props) => {
    return (
        <div className={`${props.className} productRoot ${props.fetching && "loading"}`}>
            {props.fetching ? <ReactLoading type="spin" color="white" /> :
            <div>
                <div className="productName">
                    <i className="fas fa-tshirt"></i>
                    <h4>{props.name}</h4>
                </div>
                <div className="productDetails">
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

