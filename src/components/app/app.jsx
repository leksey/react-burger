import React, { useState , useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'
import { getIngridients } from '../../services/actions/burger-ingredients'
import { HIDE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details'

import appStyles from './app.module.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngridients());
    },[dispatch])

    const { hasError, itemsRequest,  } = useSelector(state => ({
        hasError: state.burgerIngridients.hasError,
        itemsRequest: state.burgerIngridients.itemsRequest
    }));

    const { ingredientDetails } = useSelector(state => ({
        ingredientDetails: state.ingredientDetails.ingredientDetails
    }));

    const [modalState, setModalState] = useState({
        ingredientModalVisible: false,
        orderModalVisible: false
    });

    function closePopup () {
        setModalState({ingredientModalVisible: false, orderModalVisible: false})
    }
    function closeIngredientDetailsPopup () {
        dispatch({type: HIDE_INGREDIENT_DETAILS})
    }
    
    return (
    <>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
        <main className={appStyles.content}>
            { itemsRequest ? <h1>Загрузка...</h1> : hasError ? <h1>Ошибка</h1> : <BurgerIngredients />}
            <BurgerConstructor setModalState={setModalState} modalState={modalState}/>
        </main>
        </DndProvider>
        {ingredientDetails != null && (
            <Modal closePopup={closeIngredientDetailsPopup}>
                <IngredientDetails details={ingredientDetails}/>
            </Modal>
        )}
        {modalState.orderModalVisible && (
            <Modal closePopup={closePopup}>
                <OrderDetails/>
            </Modal>
        )}
    </>
  );
}

export default App;
