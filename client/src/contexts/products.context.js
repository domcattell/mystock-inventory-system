import React, { createContext, useReducer } from 'react';
import productReducer from '../reducers/productReducer'
import axios from 'axios'
import { CLEAR_PRODUCTS, CLEAR_SINGLE_ITEM, CLEAR_MESSAGES, ADD_ITEM_FAILED, UPDATE_ITEM_FAILED, TOTAL_QTY, SORT_AZ, SORT_ZA, GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ITEMS_FAILED, GET_SINGLE_ITEM, EDIT_ITEM, ITEMS_LOADING, GET_CATEGORY_PRODUCTS } from '../actions/types'

export const ProductsContext = createContext();
export const ProductsActionsContext = createContext();

export const ProductsProvider = (props) => {

    const initialState = {
        fetchingProducts: false,
        products: [],
        product: {},
        sortProductsAZ: false,
        qtyAmount: null,
        productsMsg: null
    };

    const [state, dispatch] = useReducer(productReducer, initialState);

    const loadingProducts = () => {
        dispatch({
            type: ITEMS_LOADING
        });
    };

    const getProducts = async () => {
        try {
            const res = await axios.get("/api/products/all", {
                headers: { Accept: "application/json" }
            });
            dispatch({
                type: GET_ITEMS,
                payload: res.data,
            });
            totalQty();
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err.response.data
            });
        };
    };

    const getCategoryProducts = async categoryID => {
        try {
            const res = await axios.get(`/api/products/categories/${categoryID}/category_products`, {
                headers: { Accept: "application/json" }
            });
            dispatch({
                type: GET_CATEGORY_PRODUCTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err.response.data
            });
        };
    };

    const getProduct = async itemID => {
        try {
            const res = await axios.get(`/api/products/${itemID}`, {
                headers: { Accept: "application/json" }
            });
            dispatch({
                type: GET_SINGLE_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err.response.data
            });
        };
    };

    const clearProduct = () => {
        dispatch({
            type: CLEAR_SINGLE_ITEM
        });
    };

    const addProduct = async (product) => {
         try {
            const res = await axios.post("/api/products/add", product);
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ADD_ITEM_FAILED,
                payload: err.response.data
            });
        };
    };

    const deleteProduct = async (itemID) => {
        try {
            await axios.delete(`/api/products/${itemID}`);
            dispatch({
                type: DELETE_ITEM,
                payload: itemID
            });
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err.response.data
            });
        };
    };

    const editProduct = async (product, itemID) => {
        try {
            const res = await axios.put(`/api/products/${itemID}`, product);
            dispatch({
                type: EDIT_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: UPDATE_ITEM_FAILED,
                payload: err.response.data
            });
        };
    };

    const sortAZ = () => {
        dispatch({
            type: SORT_AZ
        });
    };

    const sortZA = () => {
        dispatch({
            type: SORT_ZA
        });
    };

    const totalQty = () => {
        dispatch({
            type: TOTAL_QTY
        });
    };

    const clearProductMessages = () => dispatch({type: CLEAR_MESSAGES});

    const clearProducts = () => dispatch({type: CLEAR_PRODUCTS});
  
    const actions = {
        clearProductMessages,
        totalQty, 
        sortAZ, 
        sortZA, 
        getProducts, 
        getProduct, 
        addProduct, 
        deleteProduct, 
        editProduct, 
        loadingProducts,
        clearProduct,
        getCategoryProducts,
        clearProducts
    };

    return (
        <ProductsContext.Provider value={state}>
            <ProductsActionsContext.Provider value={actions}>
                {props.children}
            </ProductsActionsContext.Provider>
        </ProductsContext.Provider>
    );
}