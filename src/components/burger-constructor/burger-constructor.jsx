import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructor( {state, setstate} ) {
    return (
        <section className={`${burgerConstructorStyles.constructor} mt-25`}>
            <ul>
                <li className={burgerConstructorStyles.constructor__item}>
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={20}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                </li>
                <li className={burgerConstructorStyles.constructor__item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    isLocked={false}
                    text="Соус традиционный галактический"
                    price={30}
                    thumbnail='https://code.s3.yandex.net/react/code/sauce-03.png'
                    />
                </li>
                <li className={burgerConstructorStyles.constructor__item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    isLocked={false}
                    text="Мясо бессмертных моллюсков Protostomia"
                    price={300}
                    thumbnail='https://code.s3.yandex.net/react/code/meat-02.png'
                    />
                </li>
                <li className={burgerConstructorStyles.constructor__item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    isLocked={false}
                    text="Плоды Фалленианского дерева"
                    price={80}
                    thumbnail='https://code.s3.yandex.net/react/code/sp_1.png'
                    />
                </li>
                <li className={burgerConstructorStyles.constructor__item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                    isLocked={false}
                    text="Хрустящие минеральные кольца"
                    price={80}
                    thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
                    />
                </li>
                <li className={burgerConstructorStyles.constructor__item}>
                    <DragIcon type="primary" className="mr-2"/>
                    <ConstructorElement
                    isLocked={false}
                    text="Хрустящие минеральные кольца"
                    price={80}
                    thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
                    />
                </li>
                <li className={burgerConstructorStyles.constructor__item}>
                    <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={20}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                </li>
            </ul>
            <div className={`${burgerConstructorStyles.constructor__price} mt-10`}>
                <p className="text text_type_digits-medium mr-2">610</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="medium" extraClass="ml-10" htmlType="submit" onClick={() => setstate({ ...state, orderModalVisible: true })}>
                Оформить заказ
                </Button>
            </div>
            
        </section>
    )
}


export default BurgerConstructor;