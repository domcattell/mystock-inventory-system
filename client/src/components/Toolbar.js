import React,{useContext} from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'

import { ProductsContext } from '../contexts/products.context';

import useToggle from '../hooks/useToggle';

import DeleteModal from '../components/modals/DeleteModal';

import '../styles/Toolbar.scss';

const Toolbar = (props) => {
    const {sortAZ, sortZA, sortProductsAZ } = useContext(ProductsContext);
    const [deleteModal, toggleDeleteModal] = useToggle(false);

    // The logical conditional statements in this component make it slightly 
    // hard to follow, but also make it easily re-usable across the app.
    return (
        <div className="ToolbarRoot">
            {/* only render the modal if the actions prop is set to true */}
            {props.actions &&
                <DeleteModal 
                    show={deleteModal} 
                    onHide={toggleDeleteModal}
                    id={props.id}
                    deleteFunction={props.deleteFunction}
                />
            }

            {/* Only render the actions menu if props.actions is true */}
            {props.actions &&
            <div className="ToolbarMenu">
                <Dropdown>
                    <Dropdown.Toggle id="ToolbarToggle">Actions</Dropdown.Toggle>
                    <Dropdown.Menu id="ActionsDropDown">

                            <Dropdown.Item 
                            id="ActionsDropDownItem"
                            onClick={toggleDeleteModal} 
                            as="button">
                            Delete
                            </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>}
            
            {/* Only render if props.sort is set to true */}
            {props.sort &&
            <div className="ToolbarMenu">
                <Dropdown>
                    <Dropdown.Toggle id="ToolbarToggle">Sort By</Dropdown.Toggle>
                    <Dropdown.Menu id="ActionsDropDown">

                        {props.sort && 
                        <Dropdown.Item 
                            id="DropDownItem" 
                            as="button" 
                            onClick={!sortProductsAZ ? sortAZ : sortZA}>
                            Name {!sortProductsAZ ? "AZ" : "ZA"}
                        </Dropdown.Item> }

                    </Dropdown.Menu>
                </Dropdown>
            </div>}

        </div>
    );
}

export default Toolbar;