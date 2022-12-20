import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SWAP_INGREDIENT,
    ADD_BUN
} from "../actions/burger-constructor";

const initialState = {
    constructorIngredients: [],
    constructorBun: null
};

export const burgerConstructorReducer = (state = initialState, action) => {
    const swapIngredients = (arr, newIndex, oldIndex) => {
        if (arr.length <= newIndex) {
            let indx = newIndex - arr.length + 1;
            while (indx-1) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    };
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients,
                    { uid: action.payload.uid, data: action.payload.data },
                ],
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].filter(
                    (item) => item.uid !== action.payload
                ),
            };
        }
        case SWAP_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: swapIngredients(
                    [...state.constructorIngredients],
                    action.hoverId,
                    action.dragId
                ),
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                constructorBun: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

