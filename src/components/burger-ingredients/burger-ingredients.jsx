import React from 'react';
import { ingredientType, setStateType, stateType, modalStateType } from '../utils/types';
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients({ state, setstate, modalState, setModalState }) {
    const [current, setCurrent] = React.useState('sauces')
    return (
        <section className={burgerIngredientsStyles.ingridients}>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Собери бургер
            </h1>
            <div className={burgerIngredientsStyles.tabs}>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.ingridients__selector}>
                <h2 className="text text_type_main-medium mt-10 mb-6">
                    Булки
                </h2>
                <ul className={`${burgerIngredientsStyles.ingridients__list} pl-4 pr-4`}>
                {
                    state.data.map((ingridient) => {
                        return ingridient.type === 'bun' && ( <Ingredient ingridient={ingridient} state={state} setstate={setstate} key={ingridient._id} modalState={modalState} setModalState={setModalState}/> )
                    })
                }
                </ul>
                <h2 className="text text_type_main-medium mt-10 mb-6">
                    Соусы
                </h2>
                <ul className={`${burgerIngredientsStyles.ingridients__list} pl-4 pr-4`}>
                {
                    state.data.map((ingridient) => {
                        return ingridient.type === 'sauce' && ( <Ingredient ingridient={ingridient} state={state} setstate={setstate} key={ingridient._id} modalState={modalState} setModalState={setModalState}/> )
                    })
                }
                </ul>
                <h2 className="text text_type_main-medium mt-10 mb-6">
                    Начинки
                </h2>
                <ul className={`${burgerIngredientsStyles.ingridients__list} pl-4 pr-4`}>
                {   
                    state.data.map((ingridient) => {
                        return ingridient.type === 'main' && ( <Ingredient ingridient={ingridient} state={state} setstate={setstate} key={ingridient._id} modalState={modalState} setModalState={setModalState}/> )
                    })
                }
                </ul>
            </div>
        </section>
    );
}

function Ingredient({ ingridient , state, setstate, modalState, setModalState}) {
        function openModalDetails() {
            setModalState({ ...modalState, 
                ingredientModalVisible: true,
            });
            setstate({...state, details : ingridient});
    }
    return (
        <li onClick={openModalDetails} className={burgerIngredientsStyles.ingridient}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className="ml-4 mr-4 mb-1" alt={ingridient.name} src={ingridient.image} />
            <div className={`${burgerIngredientsStyles.ingridient__price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-2">{ingridient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${burgerIngredientsStyles.ingridient__name} text text_type_main-default`}>{ingridient.name}</p>
        </li>
    );
}

BurgerIngredients.propTypes =  {
    state: stateType,
    setstate: setStateType,
    modalState: modalStateType,
    setModalState: setStateType
};

Ingredient.propTypes =  {
    ingridient: ingredientType,
    state: stateType,
    setstate: setStateType,
    modalState: modalStateType,
    setModalState: setStateType
};



export default BurgerIngredients;