import React, { createContext, useReducer } from 'react';
import productReducer from '../reducers/productReducer'
import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ITEMS_FAILED, GET_SINGLE_ITEM, EDIT_ITEM, ITEMS_LOADING } from '../actions/types'

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {

    const initialState = {
        isFetching: true,
        error: false,
        products: [],
    }

    const [state, dispatch] = useReducer(productReducer, initialState)

    const itemsReset = () => {
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
 
    return (
        <ProductsContext.Provider value={{ getProducts, getProduct, addProduct, deleteProduct, editProduct, itemsReset, products: state.products, isFetching: state.isFetching }}>
            {props.children}
        </ProductsContext.Provider>
    )
}