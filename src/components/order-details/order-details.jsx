import orderDone from '../../images/done.png'
import React from 'react';
import { useSelector } from 'react-redux';

import orderDetailsStyles from './order-details.module.css';

const OrderDetails = React.memo(() => {
    const { orderNum } = useSelector(store => ({ orderNum: store.order.order }));
    return (
            <div className={`${orderDetailsStyles.order__details}`}>
                <p className={`text text_type_digits-large mt-30 mb-8 text text_type_main-large mb-4`}>{orderNum}</p>
                <p className="text text_type_main-medium">идентификатор заказа</p>
                <img className={`${orderDetailsStyles.order__details__done} mt-15 mb-15 text text_type_main-large mb-4`} alt="Order placed" src={orderDone} />
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
            </div>
        )
})

export default OrderDetails;
