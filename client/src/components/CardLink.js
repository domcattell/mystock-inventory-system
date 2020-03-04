import React, { useContext } from 'react';
import ReactLoading from 'react-loading'

import DeleteModal from '../components/modals/DeleteModal';
import useToggle from '../hooks/useToggle';

import '../styles/ProductCard.scss'

const CardLink = (props) => {
    const [deleteModal, toggleDeleteModal] = useToggle(false);

    const deleteBtn = (e) => {
        e.preventDefault();
        toggleDeleteModal(); 
    }

    return (
        <div className={`${props.className} CardRoot ${props.fetching && "loading"}`}>
            <DeleteModal show={deleteModal} onHide={toggleDeleteModal} id={props.id} name={props.name}/>   
            {props.fetching ? <ReactLoading type="bars" color="gray" size="sm"/> :
            <div>
                <div className="CardName">

                    {props.deleteIcon &&   
                    <div className="CardDelete" onClick={deleteBtn} >
                        <i className="fas fa-trash"></i>
                    </div>}

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

