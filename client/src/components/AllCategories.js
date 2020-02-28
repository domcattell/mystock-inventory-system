import React, { useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import { CategoryContext } from '../contexts/category.context';

import CardLink from './CardLink';
import GridContainer from './layout/GridContainer';

const AllCategories = () => {
    const {getCategories, categories, fetchingCategories, categoriesLoading} = useContext(CategoryContext);

    useEffect(() => {
        categoriesLoading();
        getCategories();
    },[])

    return (
        <GridContainer>
            {categories.map(category => (
                <Link to={`/categories/${category.id}`}>
                    <CardLink 
                        key={category.id}
                        name={category.category}
                        itemOne="Category ID"
                        itemOneContent={category.id}
                        fetching={fetchingCategories}
                    />
                </Link>
            ))}
        </GridContainer>
    );
}

export default AllCategories;
