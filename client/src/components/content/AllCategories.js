import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CategoryContext, CategoryActionsContext } from '../../contexts/category.context';

import ItemCard from '../tools/ItemCard';
import GridContainer from '../layout/GridContainer';

const AllCategories = () => {
    const { categories, fetchingCategories } = useContext(CategoryContext);
    const { getCategories, loadingCategories } = useContext(CategoryActionsContext);

    useEffect(() => {
      if(categories.length === 0) {
        loadingCategories();
        getCategories();
      }
    }, [categories]);

    return (
        <GridContainer>
            {categories.map(category => (
                <Link key={category.id} to={`/categories/${category.id}`}>
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
