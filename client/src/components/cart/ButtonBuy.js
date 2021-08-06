import React, { useState } from 'react'
import { Button } from '../myBootstrap'
import { onClickButtonBuy } from '../../service/cart/CartBuyService'
import './ButtonBuy.css'
import Notification from '../myBootstrap/Notification'


const ButtonBuy = (props) => {

    const [notificationVisible, setNotificationVisible] = useState(false)

    let className
    if (props?.className) className = props?.className

    return (
        <>
        <Button
            className={"ButtonBuy "+className}
            variant="outline-warning"
            onClick={e => {
                setNotificationVisible(true)
                onClickButtonBuy(e, props?.product)
            }}
        >
            {props.children}
        </Button>

        <Notification 
            show={notificationVisible} 
            onHide={() => setNotificationVisible(false)}
        >
            Товар добавлен в корзину
        </Notification>
        </>
    )
}

export default ButtonBuy
