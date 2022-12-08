import React, { useState , useReducer, useEffect, StrictMode } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'

import appStyles from './app.module.css';

import {BurgerConstructorContext, TotalPriceContext} from '../../services/appContext';


const totalPriceInitialState = { totalPrice: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { totalPrice: state.totalPrice + action.price };
    case "reset":
      return { totalPrice: 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


function App() {

    const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

    const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);
    
    const [state, setState] = useState({
        hasError: false,
        errorText: '',
        data: [],
        details: {}
    });

    const [constructorState, setConstructorState] = useState(
        {
            orderNum: '-',
            data: [],
        }
    );

    const [modalState, setModalState] = useState({
        ingredientModalVisible: false,
        orderModalVisible: false
    });

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        setConstructorState({...constructorState, data: state.data});
    },[state])

    const getData = () => {
        setState({ ...state, hasError: false});
        fetch(dataUrl)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);})
            .then(res => setState({ ...state, data: res.data}))
            .catch(e => {
                setState({ ...state, hasError: true, errorText: e});
        });
    };

    function closePopup () {
        setModalState({ingredientModalVisible: false, orderModalVisible: false})
    }
    

    return (
    <>
        <AppHeader />
        <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
        <BurgerConstructorContext.Provider value={{constructorState, setConstructorState}}>
        <main className={appStyles.content}>
            { state.hasError ? <h1>{state.errorText}</h1> : <BurgerIngredients state={state} setstate={setState} modalState={modalState} setModalState={setModalState}/>}
            <BurgerConstructor setModalState={setModalState} modalState={modalState}/>
        </main>
        {modalState.ingredientModalVisible && (
            <Modal closePopup={closePopup}>
                <IngredientDetails details={state.details}/>
            </Modal>
        )}
        {modalState.orderModalVisible && (
            <Modal closePopup={closePopup}>
                <OrderDetails/>
            </Modal>
        )}
        </BurgerConstructorContext.Provider>
        </TotalPriceContext.Provider>
    </>
  );
}

export default App;
