import { useState } from 'react';
import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import ModalOverlay from '../modal-overlay/modal-overlay'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'

import appStyles from './app.module.css';

function App() {

    const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

    const [state, setState] = useState({
        hasError: false,
        ingredientModalVisible: false,
        orderModalVisible: false,
        data: [],
        details: {}
    });

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        setState({ ...state, hasError: false});
        fetch(dataUrl)
            .then(res => res.json())
            .then(res => setState({ ...state, data: res.data}))
            .catch(e => {
                setState({ ...state, hasError: true});
        });
    };

    // function openModalDetails() {
    //     setState({ ...state, ingredientModalVisible: true});
    //     console.log(state);
    // }

    return (
    <>
        <AppHeader />
        <main className={appStyles.content}>
            { state.hasError ? <h1>Server error</h1> : <BurgerIngredients state={state} setstate={setState}/>}
            <BurgerConstructor state={state} setstate={setState}/>
        </main>
        {(state.ingredientModalVisible || state.orderModalVisible) && <ModalOverlay state={state} setstate={setState}>
            <Modal state={state} setstate={setState}>
                { !state.orderModalVisible && <IngredientDetails details={state.details} />}
                { state.orderModalVisible && <OrderDetails />}
            </Modal>
        </ModalOverlay> }
    </>
  );
}

export default App;
