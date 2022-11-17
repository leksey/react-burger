import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape(
    {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }
);

export const setStateType = PropTypes.func.isRequired;

export const closePopupType = PropTypes.func.isRequired;

export const stateType = PropTypes.shape({
        hasError: PropTypes.bool.isRequired,
        errorText: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(ingredientType).isRequired,
        details: PropTypes.shape(
            {
                _id: PropTypes.string,
                name: PropTypes.string,
                type: PropTypes.string,
                proteins: PropTypes.number,
                fat: PropTypes.number,
                carbohydrates: PropTypes.number,
                calories: PropTypes.number,
                price: PropTypes.number,
                image: PropTypes.string,
                image_mobile: PropTypes.string,
                image_large: PropTypes.string,
                __v: PropTypes.number
            }
        )
    }
);

export const modalStateType = PropTypes.shape(
        {
            ingredientModalVisible: PropTypes.bool.isRequired,
            orderModalVisible: PropTypes.bool.isRequired
        }
);

export const childrenType = PropTypes.element.isRequired;