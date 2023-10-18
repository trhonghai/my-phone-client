import { useEffect, useState } from 'react'
import api from '~/utils/api'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'

const cx = classNames.bind(styles)

function Cart() {
    const [carts, setCarts] = useState([])

    useEffect(() => {
        api.get('/carts')
            .then((res) => {
                const cart = res.data.result
                console.log('cart', cart[0])

                setCarts(cart)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('cart')}>
                    <div className={cx('cart-header')}>
                        <h1 className={cx('cart-header-title')}>Giỏ hàng</h1>
                        <h2 className='font-semibold text-4xl'>{carts.quantity}</h2>
                    </div>
                    <div className={cx('cart-des')}>
                        <h3>Chiết tiết đơn hàng</h3>
                        <h3>Quantity</h3>
                        <h3>Price</h3>
                        <h3>Total</h3>
                    </div>
                    <div className={cx('cart-detail')}>
                        <div className={cx('cart-detail-image')}>
                            <img
                                className={cx('cart-detail-imgage-src')}
                                src={`http://localhost:8000/static/image/${
                                    carts.phone_option ? carts.phone_option.images[0] : ''
                                }`}
                                // alt={carts.name}
                            />
                            <div>
                                <p>
                                    {carts.phone
                                        ? carts.phone.name.length > 10
                                            ? carts.phone.name.slice(0, 10) + '...'
                                            : carts.phone.name
                                        : ''}
                                </p>
                                {/* <p>{carts.phone.brand.name}</p> */}
                                {/* <p>{carts.phone_option.color}</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('check-out')}></div>
            </div>
        </div>
    )
}

export default Cart
