import React from 'react';
import ReactLoading from 'react-loading';

import '../../styles/tools/ItemCard.scss';

const ItemCard = (props) => {
    const { itemOne, itemTwo, itemThree, itemOneContent, itemTwoContent, itemThreeContent, fetching, name } = props;

    return (
        <div className={`CardRoot ${props.fetching && "loading"}`}>
            {fetching ? <ReactLoading type="bars" color="gray" size="sm" /> :
                <div>
                    <div className="CardName">
                        <i className="fas fa-list-ul CardIcon"></i>
                        <h4>{name}</h4>
                    </div>
                    <div className="CardDetails">
                        {itemOne && <h5>{itemOne}: {itemOneContent}</h5>}
                        {itemTwo && <h5>{itemTwo}: {itemTwoContent}</h5>}
                        {itemThree && <h5>{itemThree}: {itemThreeContent}</h5>}
                    </div>
                </div>
            }
        </div>
    );
}

export default ItemCard;

