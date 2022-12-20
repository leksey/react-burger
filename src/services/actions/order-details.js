import { sendOrder } from "../../utils/burger-api";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const UPDATE_ORDER_TOTAL = "UPDATE_ORDER_TOTAL";
export const RESET_ORDER_NUM = "RESET_ORDER_NUM";

export const getOrder = (body) => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        sendOrder(body)
            .then((res) => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: res.order.number,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAILED,
                });
                console.log(err);
            });
    };
};