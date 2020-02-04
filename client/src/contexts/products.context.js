import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import productReducer from '../reducers/productReducer'
import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ITEMS_FAILED, GET_SINGLE_ITEM, EDIT_ITEM } from '../actions/types'

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {

    const initialState = {
        isFetching: false,
        error: false,
        products: [],
    }

    const [state, dispatch] = useReducer(productReducer, initialState)

    const getProducts = useCallback(async () => {
        try {
            const res = await axios.get("/api/products/all", {
                headers: { Accept: "application/json" }
            })
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err
            })
        }
    })

    const getProduct = useCallback(async itemID => {
        try {
            const res = await axios.get(`/api/products/${itemID}`, {
                headers: { Accept: "application/json" }
            })
            dispatch({
                type: GET_SINGLE_ITEM,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err
            })
        }
    }, [dispatch])

    // const addProduct = async (product) => {
    //     try {
    //         const res = await axios.post("/api/products/add", product)
    //         .then(dispatch({
    //             type: ADD_ITEM,
    //             payload: product
    //         }))
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const addProduct = async (product) => {
         try {
            const res = await axios.post("/api/products/add", product)
            console.log(res.data)
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
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
            getProduct(product.id)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts();
    },[])

 
    return (
        <ProductsContext.Provider value={{ getProducts, getProduct, addProduct, deleteProduct, editProduct, products: state.products }}>
            {props.children}
        </ProductsContext.Provider>
    )
}