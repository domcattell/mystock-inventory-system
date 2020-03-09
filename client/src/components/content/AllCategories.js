import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CategoryContext } from '../../contexts/category.context';

import ItemCard from '../tools/ItemCard';
import GridContainer from '../layout/GridContainer';

const AllCategories = (props) => {
    const { getCategories, categories, fetchingCategories, categoriesLoading } = useContext(CategoryContext);

    useEffect(() => {
        categoriesLoading();
        getCategories();
    }, [])

    
    return (
        <GridContainer>
            {categories.map(category => (
                <Link to={`/categories/${category.id}`}>
                    <ItemCard
                        key={category.id}
                        name={category.category}
                        itemOne="See all products for"
                        itemOneContent={category.category}
                        fetching={fetchingCategories}
                        deleteIcon={true}
                        editIcon={true}
                        to={`/categories/${category.id}`}
                    />
                </Link>
            ))}
        </GridContainer>
    );
}

export default AllCategories;
