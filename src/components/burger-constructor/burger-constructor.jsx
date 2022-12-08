import { useContext, useEffect } from 'react';
import React from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setStateType, modalStateType } from '../../utils/types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {BurgerConstructorContext, TotalPriceContext} from '../../services/appContext';

const BurgerConstructor = React.memo( ( {modalState, setModalState} ) => {
    const { constructorState , setConstructorState} = useContext(BurgerConstructorContext);
    const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);
    const orderDataUrl = 'https://norma.nomoreparties.space/api/orders'
    const getOrderData = () => {
        fetch(orderDataUrl, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bodyOrder
            
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);})
            .then(res => setConstructorState({...constructorState, orderNum: res.order.number}))
            .catch(e => { return `Ошибка`});
                //setState({ ...state, hasError: true, errorText: e});
    };
    let filteredData = filterBuns(constructorState.data);
    const bodyOrder = `{"ingredients": [${filteredData.map(i => {return `"${i._id}"`})}]}`;
    useEffect(() => {
        totalPriceDispatcher({type: 'reset'});
        filteredData.forEach(item => {
            if (typeof item.price === "number"){
                totalPriceDispatcher({type: 'add', price: item.price});
            }  
        })
    },
    [constructorState.data]
    );

    function filterBuns (data) {
        let result = [];
        let bun = {};
        data.forEach(element => {
            if(element.type === 'bun' && result.find(element => element.type === 'bun') === undefined) {
                result.push(element);
                bun = structuredClone(element);
            } else if(element.type !== 'bun') {
                result.push(element);
            }
        });
        result.push(bun);
        return result;
    };
    

    return (
        <section className={`${burgerConstructorStyles.constructor} mt-25`}>
            <ul>
                {
                    filteredData.map((ingridient) => {
                        let type = undefined;
                        let noDrag = false; 
                        if (filteredData.indexOf(ingridient) === 0) {
                            type = "top";
                            noDrag = true;
                        } else if (filteredData.indexOf(ingridient) === filteredData.length-1) {
                            type = "bottom";
                            noDrag = true;
                        }
                        return (
                            <li className={burgerConstructorStyles.constructor__item} key={filteredData.indexOf(ingridient)}>
                                {!noDrag && <DragIcon type="primary" />}
                                <ConstructorElement
                                type={type}
                                isLocked={ noDrag ? true : false}
                                text={type === "top" ? ingridient.name + " (верх)" : (type === "bottom" ? ingridient.name + " (низ)" : ingridient.name)}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                                />
                            </li>
                        );
                    })
                }
            </ul>
            <div className={`${burgerConstructorStyles.constructor__price} mt-10`}>
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
