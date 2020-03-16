import React, { createContext, useReducer } from 'react';
import categoriesReducer from '../reducers/categoriesReducer';
import axios from 'axios';
import { GET_CATEGORY, CLEAR_MESSAGES, CATEGORIES_LOADING, ADD_CATEGORY, GET_CATEGORIES, EDIT_CATEGORY, DELETE_CATEGORY, CATEGORIES_FAILED, GET_CATEGORY_PRODUCTS } from "../actions/types";

export const CategoryContext = createContext();
export const CategoryActionsContext = createContext();

export const CategoryProvider = (props) => {

    const initialState = {
        fetchingCategories: false,
        category: {},
        categories: [],
        categoryMsg: null
    };

    const [state, dispatch] = useReducer(categoriesReducer, initialState);

    const loadingCategories = () => {
        dispatch({
            type: CATEGORIES_LOADING
        });
    };

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/products/categories/all");
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED,
                payload: err.response.data
            });
        };
    };

    const getCategory = async (categoryID) => {
        try {
            const res = await axios.get(`/api/products/categories/${categoryID}`);
            dispatch({
                type: GET_CATEGORY,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED,
                payload: err.response.data
            });
        };
    };

    const addCategory = async (category) => {
        try {
            const res = await axios.post("/api/products/categories/add", category);
            dispatch({
                type: ADD_CATEGORY,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED,
                payload: err.response.data
            });
        };
    };

    const deleteCategory = async (categoryID) => {
        try {
            await axios.delete(`/api/products/categories/${categoryID}`);
            dispatch({
                type: DELETE_CATEGORY,
                payload: categoryID
            });
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED
            });
        };
    };

    const editCategory = async (category, categoryID) => {
        try {
            const res = await axios.put(`/api/products/categories/${categoryID}`, category);
            dispatch({
                type: EDIT_CATEGORY,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED,
                payload: err.response.data
            });
        };
    };

    const clearCategoryMessages = () => {dispatch({type: CLEAR_MESSAGES})};

    const actions = {
        clearCategoryMessages, 
        editCategory, 
        loadingCategories, 
        deleteCategory, 
        addCategory, 
        getCategories,
        getCategory
    };

    return (
        <CategoryContext.Provider value={state}>
            <CategoryActionsContext.Provider value={actions}>
                {props.children}
            </CategoryActionsContext.Provider>
        </CategoryContext.Provider>
    );
}

