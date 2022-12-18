import { getIngredients } from '../../utils/burger-api';

export const GET_INGRIDIETNS_REQUEST = 'GET_INGRIDIETNS_REQUEST';
export const GET_INGRIDIETNS_SUCCESS = 'GET_INGRIDIETNS_SUCCESS';
export const GET_INGRIDIETNS_FAILED = 'GET_INGRIDIETNS_FAILED';

export function getIngridients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGRIDIETNS_REQUEST
        });
        getIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGRIDIETNS_SUCCESS,
                    items: res.data
                });
            } else {
                dispatch({
                    type: GET_INGRIDIETNS_FAILED
                });
            }
        });
    };
}