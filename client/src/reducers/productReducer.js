import {CLEAR_PRODUCTS, GET_CATEGORY_PRODUCTS, CLEAR_SINGLE_ITEM, CLEAR_MESSAGES, ADD_ITEM_FAILED, UPDATE_ITEM_FAILED, TOTAL_QTY, SORT_AZ, SORT_ZA, GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ITEMS_FAILED, GET_SINGLE_ITEM, EDIT_ITEM, ITEMS_LOADING} from '../actions/types'

const reducer = (state, action) => {
    switch(action.type) {
        case ITEMS_LOADING:
            return {
                ...state,
                fetchingProducts: true,
            }
            
        case GET_ITEMS:
            return {
                ...state,
                fetchingProducts: false,
                products: action.payload,
            }
        
        case GET_SINGLE_ITEM:
            return {
                ...state,
                fetchingProducts: false,
                product: action.payload[0]
            }

        case CLEAR_SINGLE_ITEM: 
            return {
                ...state,
                product: {},
                fetchingProducts: true
            }

        case GET_CATEGORY_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                fetchingProducts: false,
            }
            
        case GET_ITEMS_FAILED:
            return {
                ...state,
                fetchingProducts: false,
                productsMsg: action.payload.msg
            }
        
        case ADD_ITEM:
            return {
                ...state,
                products: [...state.products, action.payload.newProduct],
                qtyAmount: state.qtyAmount + parseInt(action.payload.newProduct.qty),
                productsMsg: action.payload.msg
            }
        
        case UPDATE_ITEM_FAILED:
        case ADD_ITEM_FAILED:
            return {
                ...state,
                productsMsg: action.payload.msg
            }
        
        case DELETE_ITEM:
            return {
                ...state,
                products: state.products.filter(product => product.id != action.payload)
            }

        case EDIT_ITEM:
            return {
                ...state,
                products: state.products.map(product => (product.id == action.payload.updatedProduct[0].id ? action.payload.updatedProduct[0] : product)),
                product: action.payload.updatedProduct[0],
                productsMsg: action.payload.msg  
            }

        case SORT_AZ: 
            return { 
                ...state,
                products: state.products.sort((a, b) => a.product_name.localeCompare(b.product_name)),
                sortProductsAZ: true
            }
        
        case SORT_ZA:
            return {
                ...state,
                products: state.products.sort((a, b) => a.product_name.localeCompare(b.product_name)).reverse(),
                sortProductsAZ: false
            }

        case TOTAL_QTY: 
            return {
                ...state,
                qtyAmount: state.products.reduce((a, {qty}) => a + qty, 0)
            }

        case CLEAR_MESSAGES:
            return {
                ...state,
                productsMsg: null,
            }

        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: []
            }
            
        default:
            return state 
    }

}

export default reducer;