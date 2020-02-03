import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ITEMS_FAILED, GET_SINGLE_ITEM, EDIT_ITEM} from '../actions/types'

const reducer = (state, action) => {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        
        case GET_SINGLE_ITEM:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }

        case GET_ITEMS_FAILED:
            return {
                ...state,
                error: true,
                isFetching: false
            }
        
        case ADD_ITEM:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        
        case DELETE_ITEM:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            }

        case EDIT_ITEM:
            return {
                ...state,
                products: state.products.map(product => product.id === action.id ? {...state.product, product} : product)
            }
        
        default:
            return state
    }
}

export default reducer;