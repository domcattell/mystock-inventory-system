import React, { createContext, useReducer } from 'react';
import productReducer from '../reducers/productReducer'
import axios from 'axios'
import { SORT_AZ, SORT_ZA, GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ITEMS_FAILED, GET_SINGLE_ITEM, EDIT_ITEM, ITEMS_LOADING } from '../actions/types'

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {

    const initialState = {
        isFetching: true,
        error: false,
        products: [],
        sortProductsAZ: false
    }

    const [state, dispatch] = useReducer(productReducer, initialState)

    const loading = () => {
        dispatch({
            type: ITEMS_LOADING
        })
    }

    const getProducts = async () => {
        try {
            const res = await axios.get("/api/products/all", {
                headers: { Accept: "application/json" }
            })
            dispatch({
                type: GET_ITEMS,
                payload: res.data,
                isFetching: false
            })
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err,
                isFetching: false
            })
        }
    }

    const getProduct = async itemID => {
        try {
            const res = await axios.get(`/api/products/${itemID}`, {
                headers: { Accept: "application/json" }
            })
            dispatch({
                type: GET_SINGLE_ITEM,
                payload: res.data,
                isFetching: false
            })
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err,
                isFetching: false
            })
        }
    }

    const addProduct = async (product) => {
         try {
            const res = await axios.post("/api/products/add", product)
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteProduct = async (itemID) => {
        try {
            await axios.delete(`/api/products/${itemID}`)
            dispatch({
                type: DELETE_ITEM,
                payload: itemID
            })
        } catch (err) {
            console.log(err)
        }
    }

    const editProduct = async (product, itemID) => {
        try {
            const res = await axios.put(`/api/products/${itemID}`, product)
            dispatch({
                type: EDIT_ITEM,
                payload: res.data,
                id: itemID
            })
        } catch (err) {
            console.log(err)
        }
    }

    const sortAZ = () => {
        dispatch({
            type: SORT_AZ
        })
    }

    const sortZA = () => {
        dispatch({
            type: SORT_ZA
        })
    }
 
    return (
        <ProductsContext.Provider value={{ sortAZ, sortZA, getProducts, getProduct, addProduct, deleteProduct, editProduct, loading, products: state.products, isFetching: state.isFetching, sortProductsAZ: state.sortProductsAZ }}>
            {props.children}
        </ProductsContext.Provider>
    )
}