import { useContext, useEffect } from 'react';
import React from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setStateType, modalStateType } from '../../utils/types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {BurgerConstructorContext, TotalPriceContext} from '../../services/appContext';
import {sendOrder} from '../../utils/burger-api';

const BurgerConstructor = React.memo( ( {modalState, setModalState} ) => {
    const { constructorState , setConstructorState} = useContext(BurgerConstructorContext);
    const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);
    const getOrderData = () => {
        sendOrder(bodyOrder)
            .then(res => setConstructorState({...constructorState, orderNum: res.order.number}))
            .catch(e => { return `Ошибка`});
                //setState({ ...state, hasError: true, errorText: e});
    };
    let bun = null;
    function filterBuns (data) {
        let result = [];
        data.forEach(element => {
            if(element.type === 'bun' && bun === null) {
                bun = structuredClone(element);
            } else if(element.type !== 'bun') {
                result.push(element);
            }
        });
        return result;
    };

    let ingridients = filterBuns(constructorState.data);
    const bodyOrder = {"ingredients": ingridients.map(i => i._id)};
    useEffect(() => {
        totalPriceDispatcher({type: 'reset'});
        ingridients.forEach(item => {
            if (typeof item.price === "number"){
                totalPriceDispatcher({type: 'add', price: item.price});
            }
        })
        bun !== null && totalPriceDispatcher({type: 'add', price: bun.price*2});
    },
    [constructorState.data]
    );

    
    

    return (
        <section className={`${burgerConstructorStyles.constructor} mt-25`}>
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
                    ingridients.map((ingridient) => {
                        return (
                            <li className={burgerConstructorStyles.constructor__item} key={ingridients.indexOf(ingridient)}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                isLocked={false}
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                                />
                            </li>
                        );
                    })
                }
                </div>
                {bun !== null &&<li className={burgerConstructorStyles.constructor__item_bun}>
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
                <p className="text text_type_digits-medium mr-2">{totalPriceState.totalPrice > 0 ? totalPriceState.totalPrice : 0}</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="medium" extraClass="ml-10" htmlType="submit" onClick={() => {setModalState({ ...modalState, orderModalVisible: true }); getOrderData()}}>
                Оформить заказ
                </Button>
            </div>
            
        </section>
    );
})

BurgerConstructor.propTypes =  {
    modalState: modalStateType,
    setModalState: setStateType
};


export default BurgerConstructor;
