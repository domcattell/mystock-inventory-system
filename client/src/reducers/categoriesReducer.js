import {
    GET_CATEGORY,
    CATEGORIES_LOADING,
    ADD_CATEGORY,
    GET_CATEGORIES,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    CATEGORIES_FAILED,
    CLEAR_MESSAGES
} from "../actions/types"

const reducer = (state, action) => {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                fetchingCategories: true,
            };

        case GET_CATEGORIES:
            return {
                ...state,
                fetchingCategories: false,
                categories: action.payload
            };


        case GET_CATEGORY:
            return {
                ...state,
                fetchingCategories: false,
                category: action.payload[0]
            };


        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload.newCategory],
                categoryMsg: action.payload.msg
            };


        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category.id != action.payload)
            };


        case EDIT_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(category => (category.id == action.payload.updatedCategory.id ? action.payload.updatedCategory : category)),
                category: action.payload.updatedCategory,
                categoryMsg: action.payload.msg
            };


        case CATEGORIES_FAILED:
            return {
                ...state,
                categoryError: true,
                categoriesFetching: false,
                categoryMsg: action.payload.msg
            };


        case CLEAR_MESSAGES:
            return {
                ...state,
                categoryMsg: null,
                categoryError: false
            };

        default:
            return state;
    }
}

export default reducer;