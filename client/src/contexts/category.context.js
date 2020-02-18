import React, { createContext, useReducer, useCallback } from 'react';
import categoriesReducer from '../reducers/categoriesReducer'
import axios from 'axios'
import { CATEGORIES_LOADING, ADD_CATEGORY, GET_CATEGORIES, EDIT_CATEGORY, DELETE_CATEGORY, CATEGORIES_FAILED } from "../actions/types"

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {

    const initialState = {
        fetchingCategories: true,
        error: false,
        categories: []
    }

    const [state, dispatch] = useReducer(categoriesReducer, initialState)

    const categoriesLoading = () => {
        dispatch({
            type: CATEGORIES_LOADING
        })
    }

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/products/categories/all")
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED
            })
        }
    }

    const addCategory = async (category) => {
        try {
            const res = await axios.post("/api/products/categories/add", category)
            dispatch({
                type: ADD_CATEGORY,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED
            })
        }
    }

    const deleteCategory = async (categoryID) => {
        try {
            await axios.delete(`/api/products/categories/${categoryID}`)
            dispatch({
                type: DELETE_CATEGORY,
                payload: categoryID
            })
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED
            })
        }
    }

    const editCategory = async (category, categoryID) => {
        try {
            const res = await axios.put(`/api/products/categories/${categoryID}`, category)
            dispatch({
                type: EDIT_CATEGORY,
                payload: res.data,
                id: categoryID
            })
        } catch (err) {
            dispatch({
                type: CATEGORIES_FAILED
            })
        }
    }

    return (
        <CategoryContext.Provider value={{editCategory, deleteCategory, addCategory, getCategories, fetchingCategories: state.fetchingCategories, categories: state.categories, error: state.error}}>
            {props.children}
        </CategoryContext.Provider>
    )

}