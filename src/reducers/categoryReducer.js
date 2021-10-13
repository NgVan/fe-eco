import { 
    ADD_CATEGORY,
    EDIT_CATEGORY,
    GET_CATEGORY } from "../actions/types";

const DEFAULT_STATE = {
    categories: []
}

export const categoryReducer = (state = DEFAULT_STATE, action ) => {
    switch (action.type) {
        case GET_CATEGORY: {
            return {
                ...state,
                categories: action.payload
            }
        }

        case ADD_CATEGORY: {
            return state
        }

        case EDIT_CATEGORY: {
            return state
        }

        default:
            return state
    }
}