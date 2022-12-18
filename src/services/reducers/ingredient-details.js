import { SHOW_INGREDIENT_DETAILS, HIDE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initialState = {
    ingredientDetails: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: action.payload,
            };
        }
        case HIDE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: null,
            };
        }
        default: {
            return state;
        }
    }
};