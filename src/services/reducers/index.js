import { combineReducers } from 'redux';
import { burgerIngridientsReducer } from './burger-ingredients'
import { ingredientDetailsReducer } from './ingredient-details'
import { burgerConstructorReducer } from './burger-constructor'
import { orderReducer } from './order-details'

export const rootReducer = combineReducers({
    burgerIngridients: burgerIngridientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer
});