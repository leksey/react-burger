import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    UPDATE_ORDER_TOTAL
} from "../actions/order-details";

const initialState = {
    order: null,
    orderTotal: 0,
    orderRequest: false,
    orderFailed: false
};
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                order: action.payload
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                order: null,
                orderRequest: false,
                orderFailed: true
            };
        }
        case UPDATE_ORDER_TOTAL: {
            return {
                ...state,
                orderTotal: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
