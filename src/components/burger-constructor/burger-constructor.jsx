import React from 'react';
import { useEffect, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import uuid from "react-uuid";
import { setStateType, modalStateType } from '../../utils/types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SWAP_INGREDIENT, ADD_BUN } from '../../services/actions/burger-constructor';
import { UPDATE_ORDER_TOTAL, RESET_ORDER_NUM, getOrder } from '../../services/actions/order-details';

const BurgerConstructor = React.memo(({ modalState, setModalState }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(store => ({ ingredients: store.burgerConstructor.constructorIngredients }));
    const { bun } = useSelector(store => ({ bun: store.burgerConstructor.constructorBun }));
    const { totalPrice } = useSelector(store => ({ totalPrice: store.order.orderTotal }));

    const addBun = (ingredient) => {
        dispatch({ type: ADD_BUN, payload: ingredient });
    }

    const addIngredient = ( ingredient ) => {
        dispatch({ type: ADD_INGREDIENT, payload: ingredient })
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.ingridient.type === 'bun') {
                addBun(item.ingridient);
            }
            else {
                addIngredient({uid: uuid(), data: item.ingridient});
            }
        }
    })

    useEffect(() => {
        let sum = 0;
        ingredients.forEach(item => {
            if (typeof item.data.price === "number") {
                sum+=item.data.price;
            }
        })
        if (bun !== null) {
            sum+= (bun.price * 2)
        }
        dispatch({ type: UPDATE_ORDER_TOTAL, payload: sum});
    },
        [ingredients, bun]
    );
    
    return (
        <section className={`${burgerConstructorStyles.constructor} ${isHover && burgerConstructorStyles.constructor__on_hover} mt-25`} ref={dropTarget}>
            <ul className={burgerConstructorStyles.constructor_list}>
                {bun !== null && <li className={burgerConstructorStyles.constructor__item_bun}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>}
                <div className={burgerConstructorStyles.constructor_inridients}>
                    {
                        ingredients.map((ingredient) => {
                            return (
                            <ConstructorIngredient ingredient={ingredient} key={ingredient.uid} id={ingredients.indexOf(ingredient)}/>
                        );
                        })
                    }
                </div>
                {bun !== null && <li className={burgerConstructorStyles.constructor__item_bun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>}
            </ul>
            <div className={`${burgerConstructorStyles.constructor__price} mt-5`}>
                <p className="text text_type_digits-medium mr-2">{totalPrice > 0 ? totalPrice : 0}</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="medium" extraClass="ml-10" htmlType="submit" 
                    onClick={() => {
                        dispatch({ type: RESET_ORDER_NUM });
                        setModalState({ ...modalState, orderModalVisible: true });
                        const ingidientsArr = ingredients.map(item => item.data._id);
                        ingidientsArr.push(bun._id);
                        ingidientsArr.unshift(bun._id);
                        const bodyOrder = { "ingredients": ingidientsArr};
                        dispatch(getOrder(bodyOrder));
                    }}>
                    Оформить заказ
                </Button>
            </div>

        </section>
    );
})

function ConstructorIngredient ({ ingredient, id }) {
    const dispatch = useDispatch();
    const removeIngredient = (uid) => {
        dispatch({ type: REMOVE_INGREDIENT, payload: uid });
    }

    const swapIngredient = (hoverId, dragId) => {
        dispatch({ type: SWAP_INGREDIENT, hoverId, dragId});
    }
    const [{ opacity }, dragRef] = useDrag({
        type: 'burgerIngredient',
        item: {ingredient, id},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1
        })
    });
    const [{ isHover }, dropRef] = useDrop ({
        accept: 'burgerIngredient',
        collect: monitor => ({
            isSwap: monitor.isOver()
          }),
          hover: (item) => {
            swapIngredient(item.id, id);
            item.id = id;
        }
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    return (
        <li draggable ref={dragDropRef} className={`${burgerConstructorStyles.constructor__item} ${isHover && burgerConstructorStyles.constructor__item__on_hover}`} style={{opacity}}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={ingredient.data.name}
                price={ingredient.data.price}
                thumbnail={ingredient.data.image}
                handleClose={() => { removeIngredient(ingredient.uid) }}
            />
        </li>
    );
}

BurgerConstructor.propTypes = {
    modalState: modalStateType,
    setModalState: setStateType
};

export default BurgerConstructor;
