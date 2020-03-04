import React,{useContext} from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'

import { ProductsContext } from '../contexts/products.context';

import '../styles/Toolbar.scss';

const Toolbar = () => {

    const {sortAZ, sortZA, sortProductsAZ } = useContext(ProductsContext)

    const sortBtn = () => {
        if (!sortProductsAZ) {
            return <i onClick={sortAZ} className="fas fa-sort-alpha-up"></i>
        } else {
            return <i onClick={sortZA} className="fas fa-sort-alpha-up-alt"></i>
        }
    }

    return (
        <div className="ToolbarRoot">
            {/* <div className="SortBy">
                <p>Sort by name:</p>
                {sortBtn()}
            </div> */}
            <div className="Actions">
                <Dropdown>
                    <Dropdown.Toggle id="ActionsToggle">Actions</Dropdown.Toggle>
                    <Dropdown.Menu id="ActionsDropDown">
                        <Dropdown.Item id="ActionsDropDownItem" as="button" onClick={!sortProductsAZ ? sortAZ : sortZA}>{!sortProductsAZ ? "Sort AZ" : "Sort ZA"}</Dropdown.Item>
                        <Dropdown.Item id="ActionsDropDownItem" as="button">Rename</Dropdown.Item>
                        <Dropdown.Item id="ActionsDropDownItem" as="button">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Toolbar;


{/* <DropdownButton 
                    id="dropdown-basic-button"
                    title="Actions"
                    size="sm"
                    variant="secondary"
                    bsPrefix="DropDownBtn"
                    >
                    <Dropdown.Item className="DropDownItem" as="button" onClick={!sortProductsAZ ? sortAZ : sortZA}>{!sortProductsAZ ? "Sort AZ" : "Sort ZA"}</Dropdown.Item>
                    <Dropdown.Item as="button">Rename</Dropdown.Item>
                    <Dropdown.Item as="button">Delete</Dropdown.Item>
                </DropdownButton> */}