import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderData from '../utils/order'
import { setStateType, modalStateType } from '../utils/types';
import burgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructor( {modalState, setModalState} ) {
    return (
        <section className={`${burgerConstructorStyles.constructor} mt-25`}>
            <ul>
                {
                    orderData.map((ingridient) => {
                        let type = undefined;
                        let noDrag = false; 
                        if (orderData.indexOf(ingridient) === 0) {
                            type = "top";
                            noDrag = true;
                        } else if (orderData.indexOf(ingridient) === orderData.length-1) {
                            type = "bottom";
                            noDrag = true;
                        }
                        return (
                            <li className={burgerConstructorStyles.constructor__item} key={orderData.indexOf(ingridient)}>
                                {!noDrag && <DragIcon type="primary" />}
                                <ConstructorElement
                                type={type}
                                isLocked={true}
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                                />
                            </li>
                        );
                    })
                }
            </ul>
            <div className={`${burgerConstructorStyles.constructor__price} mt-10`}>
                <p className="text text_type_digits-medium mr-2">610</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="medium" extraClass="ml-10" htmlType="submit" onClick={() => setModalState({ ...modalState, orderModalVisible: true })}>
                Оформить заказ
                </Button>
            </div>
            
        </section>
    );
}

BurgerConstructor.propTypes =  {
    modalState: modalStateType,
    setModalState: setStateType
};


export default BurgerConstructor;
