import { CATEGORIES_LOADING, ADD_CATEGORY, GET_CATEGORIES, EDIT_CATEGORY, DELETE_CATEGORY, CATEGORIES_FAILED, CLEAR_MESSAGES } from "../actions/types"

const reducer = (state, action) => {
    switch(action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                fetchingCategories: true,
                categoryError: false
            }
        
        case GET_CATEGORIES: {
            return {
                ...state,
                fetchingCategories: false,
                categories: action.payload
            }
        }

        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        }

        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            }
        }

        case EDIT_CATEGORY: {
            return {
                ...state,
                categories: state.categories.map(category => category.id === action.id) ? [action.payload] : state.categories
            }
        }

        case CATEGORIES_FAILED: {
            return {
                ...state,
                categoryError: true,
                categoriesFetching: false,
                categoryMsg: action.payload
            }
        }

        case CLEAR_MESSAGES: {
            return {
                ...state,
                categoryMsg: null,
                categoryError: false
            }
        }
    }
}

export default reducer;