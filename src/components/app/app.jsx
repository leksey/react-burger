import { useState } from 'react';
import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'

import appStyles from './app.module.css';

function App() {

    const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

    const [state, setState] = useState({
        hasError: false,
        errorText: '',
        data: [],
        details: {}
    });
    const [modalState, setModalState] = useState({
        ingredientModalVisible: false,
        orderModalVisible: false
    });

    useEffect(() => {
        getData();
    },[])

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

    return (
    <>
        <AppHeader />
        <main className={appStyles.content}>
            { state.hasError ? <h1>{state.errorText}</h1> : <BurgerIngredients state={state} setstate={setState} modalState={modalState} setModalState={setModalState} />}
            <BurgerConstructor setModalState={setModalState} modalState={modalState}/>
        </main>
        {modalState.ingredientModalVisible && (
            <Modal modalState={modalState} setModalState={setModalState} >
                <IngredientDetails details={state.details} />
            </Modal>
        )}
        {modalState.orderModalVisible && (
            <Modal modalState={modalState} setModalState={setModalState} >
                <OrderDetails />
            </Modal>
        )}
    </>
  );
}

export default App;
