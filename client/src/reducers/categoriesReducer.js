import { CATEGORIES_LOADING, ADD_CATEGORY, GET_CATEGORIES, EDIT_CATEGORY, DELETE_CATEGORY, CATEGORIES_FAILED } from "../actions/types"

const reducer = (state, action) => {
    switch(action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                fetchingCategories: true,
                error: false
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
                error: true,
                categoriesFetching: false
            }
        }
    }
}