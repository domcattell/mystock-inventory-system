import React,{useContext} from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';

import { ProductsContext } from '../../contexts/products.context';

import useToggle from '../../hooks/useToggle';

import DeleteModal from '../modals/DeleteModal';

import '../../styles/tools/Toolbar.scss';

const Toolbar = (props) => {
    const {sortAZ, sortZA, sortProductsAZ } = useContext(ProductsContext);
    const [deleteModal, toggleDeleteModal] = useToggle(false);

    // The logical conditional statements in this component make it slightly 
    // hard to follow, but also make it easily re-usable across the app.
    return (
        <div className="Toolbar">
            {/* only render the modal if the actions prop is set to true */}
            {props.actions &&
            <div className="Toolbar__menu">
                <DeleteModal 
                    show={deleteModal} 
                    onHide={toggleDeleteModal}
                    id={props.id}
                    deleteFunction={props.deleteFunction}
                    // the props on this component are passed down from the Toolbar component,
                    // and so none of these props have to be adjusted. 
                />
                <Dropdown>
                    <Dropdown.Toggle className="Toolbar__toggle">Actions</Dropdown.Toggle>
                    <Dropdown.Menu >

                            <Dropdown.Item 
                            className="Toolbar__dropdown-item" 
                            onClick={toggleDeleteModal} 
                            as="button">
                            Delete
                            </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>
            }
            
            {/* Only render if props.sort is set to true */}
            {props.sort &&
            <div className="Toolbar__menu">
                <Dropdown>
                    <Dropdown.Toggle className="Toolbar__toggle">Sort By</Dropdown.Toggle>
                    <Dropdown.Menu>

                        <Dropdown.Item 
                            className="Toolbar__dropdown-item" 
                            as="button" 
                            onClick={!sortProductsAZ ? sortAZ : sortZA}>
                            Name {!sortProductsAZ ? "AZ" : "ZA"}
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>
            }
        </div>
    );
};

export default Toolbar;