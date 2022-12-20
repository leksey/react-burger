import React from 'react';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { ingredientType } from '../../utils/types';
import { useInView } from "react-intersection-observer";
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SHOW_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details'

import burgerIngredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = React.memo(() => {
    const [current, setCurrent] = React.useState('sauces')
    const { data } = useSelector(state => ({
        data: state.burgerIngridients.data
    }));

    const [bun, viewBun] = useInView({
        threshold: 0.2
    });
    const [sauce, viewSauce] = useInView({
        threshold: 0.5
    });
    const [main, viewMain] = useInView({
        threshold: 1
    });

    useEffect(()=>{
        if(viewBun){
            setCurrent('bun');
        }
        else if(viewSauce){
            setCurrent('sauce');
        }
        else if(viewMain){
            setCurrent('main');
        }
    }, [viewBun,viewSauce,viewMain]);

    return (
        <section className={burgerIngredientsStyles.ingridients}>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Собери бургер
            </h1>
            <div className={burgerIngredientsStyles.tabs}>
                <a href='#bun' className={burgerIngredientsStyles.link}>
                <Tab value="bun" active={current === 'bun'} viewBun={viewBun} onClick={setCurrent}>
                    Булки
                </Tab></a>
                <a href='#sauce' className={burgerIngredientsStyles.link}>
                <Tab value="sauce" active={current === 'sauce'} viewSauce={viewSauce} onClick={setCurrent}>
                    Соусы
                </Tab></a>
                <a href='#main' className={burgerIngredientsStyles.link}>
                <Tab value="main" active={current === 'main'} viewMain={viewMain} onClick={setCurrent}>
                    Начинки
                </Tab></a>
            </div>
            <div className={burgerIngredientsStyles.ingridients__selector}>
                <h2 ref={bun} id='bun' className="text text_type_main-medium mt-10 mb-6">
                    Булки
                </h2>
                <ul className={`${burgerIngredientsStyles.ingridients__list} pl-4 pr-4`}>
                    {
                        data.length !== 0 && data.map((ingridient) => {
                            return ingridient.type === 'bun' && (<Ingredient ingridient={ingridient} key={ingridient._id} />)
                        })
                    }
                </ul>
                <h2 ref={sauce} id='sauce' className="text text_type_main-medium mt-10 mb-6">
                    Соусы
                </h2>
                <ul className={`${burgerIngredientsStyles.ingridients__list} pl-4 pr-4`}>
                    {
                        data.length !== 0 && data.map((ingridient) => {
                            return ingridient.type === 'sauce' && (<Ingredient ingridient={ingridient} key={ingridient._id} />)
                        })
                    }
                </ul>
                <h2 ref={main} id='main' className="text text_type_main-medium mt-10 mb-6">
                    Начинки
                </h2>
                <ul className={`${burgerIngredientsStyles.ingridients__list} pl-4 pr-4`}>
                    {
                        data.length !== 0 && data.map((ingridient) => {
                            return ingridient.type === 'main' && (<Ingredient ingridient={ingridient} key={ingridient._id} />)
                        })
                    }
                </ul>
            </div>
        </section>
    );
})

function Ingredient({ ingridient }) {
    const { constructorIngredients, constructorBun } = useSelector(store=>({
        constructorIngredients: store.burgerConstructor.constructorIngredients,
        constructorBun: store.burgerConstructor.constructorBun
    }));
    const dispatch = useDispatch();
    function openModalDetails() {
        dispatch({ type: SHOW_INGREDIENT_DETAILS, payload: ingridient });
    }
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ingridient },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1
        })
    })
    const setCounter = useMemo(() =>{
        if(ingridient.type === 'bun'){
            return constructorBun && ingridient._id === constructorBun._id ? 2 : 0;
        }
        else{
            return constructorIngredients.length > 0 && constructorIngredients.filter((element) => element.data._id === ingridient._id).length;
        }
    }, [constructorIngredients, constructorBun, ingridient]);
    return (
        <li draggable ref={dragRef} style={{opacity}} onClick={openModalDetails} className={burgerIngredientsStyles.ingridient}>
            {setCounter > 0 && <Counter count={setCounter} size="default" extraClass="m-1"/>}
            <img className="ml-4 mr-4 mb-1" alt={ingridient.name} src={ingridient.image} />
            <div className={`${burgerIngredientsStyles.ingridient__price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-2">{ingridient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${burgerIngredientsStyles.ingridient__name} text text_type_main-default`}>{ingridient.name}</p>
        </li>
    );
}



Ingredient.propTypes = {
    ingridient: ingredientType,
};



export default BurgerIngredients;