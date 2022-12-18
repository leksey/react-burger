import {
    GET_INGRIDIETNS_REQUEST,
    GET_INGRIDIETNS_SUCCESS,
    GET_INGRIDIETNS_FAILED
} from '../actions/burger-ingredients';

const initialState = {
    hasError: false,
    itemsRequest: false,
    data: [],
};

export const burgerIngridientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGRIDIETNS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_INGRIDIETNS_SUCCESS: {
            return { ...state, hasError: false, data: action.items, itemsRequest: false };
        }
        case GET_INGRIDIETNS_FAILED: {
            return { ...state, hasError: true, itemsRequest: false };
        }
        default: {
            return state;
        }
    }
};