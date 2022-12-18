import React from 'react';
import { useEffect, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setStateType, modalStateType } from '../../utils/types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SWAP_INGREDIENT, ADD_BUN } from '../../services/actions/burger-constructor';
import { UPDATE_ORDER_TOTAL, getOrder } from '../../services/actions/order-details';

const BurgerConstructor = React.memo(({ modalState, setModalState }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(store => ({ ingredients: store.burgerConstructor.constructorIngredients }));
    const { bun } = useSelector(store => ({ bun: store.burgerConstructor.constructorBun }));
    const { totalPrice } = useSelector(store => ({ totalPrice: store.order.orderTotal }));

    const addBun = (ingredient) => {
        dispatch({ type: ADD_BUN, payload: ingredient });
    }

    const addIngredient = (ingredient) => {
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
                addIngredient(item.ingridient);
            }
        }
    })
    
    useEffect(() => {
        const orderBodyArray = [];
        let sum = 0;
        ingredients.forEach(item => {
            if (typeof item.data.price === "number") {
                sum+=item.data.price;
                orderBodyArray.push(item.data._id);
            }
        })
        if (bun !== null) {
            sum+= (bun.price * 2)
            orderBodyArray.push(bun._id);
            orderBodyArray.unshift(bun._id);
        }
        dispatch({ type: UPDATE_ORDER_TOTAL, payload: sum});
        const bodyOrder = { "ingredients": orderBodyArray };
        dispatch(getOrder(bodyOrder))
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
                            <ConstructorIngredient ingredient={ingredient} id={ingredients.indexOf(ingredient)}/>
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
                <Button type="primary" size="medium" extraClass="ml-10" htmlType="submit" onClick={() => { setModalState({ ...modalState, orderModalVisible: true }); }}>
                    Оформить заказ
                </Button>
            </div>

        </section>
    );
})

function ConstructorIngredient ({ ingredient, id }) {
    const dispatch = useDispatch();
    const removeIngredient = (id) => {
        dispatch({ type: REMOVE_INGREDIENT, payload: id });
    }

    const swapIngredient = (dragId, hoverId) => {
        dispatch({ type: SWAP_INGREDIENT, hoverId, dragId});
    }
    const [{ opacity },dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient, id},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1
        }),
        
    });
    const [{ isHover }, dropRef] = useDrop ({
        accept: 'ingredient',
        collect:monitor => ({
            isHover: monitor.isOver()
          }),
          hover: (item, monitor) => {
            swapIngredient(item.index, id);
            item.index = id;
        },
    })
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    return (
        <li draggable ref={dragDropRef} className={`${burgerConstructorStyles.constructor__item} ${isHover && burgerConstructorStyles.constructor__item__on_hover}`} key={id} style={{opacity}}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={ingredient.data.name}
                price={ingredient.data.price}
                thumbnail={ingredient.data.image}
                handleClose={() => { removeIngredient(ingredient.id) }}
            />
        </li>
    );
}


BurgerConstructor.propTypes = {
    modalState: modalStateType,
    setModalState: setStateType
};


export default BurgerConstructor;
