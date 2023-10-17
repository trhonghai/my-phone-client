import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    const [brands, setBrands] = useState([])
    const [brandsChecked, setBrandsChecked] = useState([])
    const [phones, setPhones] = useState([])

    // Call api get all brands
    useEffect(() => {
        api.get('/brands')
            .then((res) => {
                setBrands(res.data.result)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }, [])

    // Call api get phones
    useEffect(() => {
        api.get('/phones', {
            params: {
                page: 1,
                limit: 10,
                brands: brandsChecked.join('|')
            }
        })
            .then((res) => {
                setPhones(res.data.result.phones)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }, [brandsChecked])

    const handleChangeCheckbox = (e) => {
        if (e.target.checked) {
            setBrandsChecked([...brandsChecked, e.target.value])
        } else {
            setBrandsChecked(brandsChecked.filter((brand) => brand !== e.target.value))
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Sản phẩm</h2>
            <div className={cx('content')}>
                <div className={cx('brands')}>
                    <h3 className={cx('brands-heading')}>Thương hiệu</h3>
                    <div className={cx('brands-list')}>
                        {brands.map((brand) => (
                            <label key={brand._id} htmlFor={brand._id} className={cx('brands-item')}>
                                <input
                                    type='checkbox'
                                    id={brand._id}
                                    name={brand.name}
                                    value={brand._id}
                                    onChange={handleChangeCheckbox}
                                />
                                <span>{brand.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className={cx('phones')}>
                    <div className={cx('phones-list')}>
                        {phones.map((phone) => {
                            const save = phone.price_before_discount - phone.price[phone.price.length - 1]
                            const savePercent = ((save / phone.price_before_discount) * 100).toFixed(2)

                            return (
                                <Link key={phone._id} to={`/phone/${phone._id}`} className={cx('phones-item')}>
                                    <div className={cx('above')}>
                                        <div className={cx('image-wrap')}>
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${phone.image}`}
                                                alt={phone.name}
                                            />
                                        </div>
                                        <div className={cx('save')}>
                                            <span>TIẾT KIỆM</span>
                                            <span>{formatPrice(save)}</span>
                                        </div>
                                    </div>
                                    <div className={cx('details')}>
                                        <div className={cx('brand')}>{phone.brand.name}</div>
                                        <h3 className={cx('name')}>{phone.name}</h3>
                                        <div className={cx('price')}>
                                            {formatPrice(phone.price[0]) +
                                                (phone.price[1] ? ` - ${formatPrice(phone.price[1])}` : '')}
                                        </div>
                                        <div className={cx('price-before-discount')}>
                                            <span>{formatPrice(phone.price_before_discount)}</span>
                                            <span>{`-${savePercent}%`}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
