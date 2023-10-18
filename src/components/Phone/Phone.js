import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import formatPrice from '~/utils/formatPrice'
import styles from './Phone.module.scss'

const cx = classNames.bind(styles)

function Phone({ data }) {
    const save = data.price_before_discount - data.price[data.price.length - 1]
    const savePercent = ((save / data.price_before_discount) * 100).toFixed(2)

    return (
        <Link key={data._id} to={`/phone/${data._id}`} className={cx('wrapper')}>
            <div className={cx('above')}>
                <div className={cx('image-wrap')}>
                    <img src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${data.image}`} alt={data.name} />
                </div>
                <div className={cx('save')}>
                    <span>TIẾT KIỆM</span>
                    <span>{formatPrice(save)}</span>
                </div>
            </div>
            <div className={cx('details')}>
                <div className={cx('brand')}>{data.brand.name}</div>
                <h3 className={cx('name')}>{data.name}</h3>
                <div className={cx('price')}>
                    {formatPrice(data.price[0]) + (data.price[1] ? ` - ${formatPrice(data.price[1])}` : '')}
                </div>
                <div className={cx('price-before-discount')}>
                    <span>{formatPrice(data.price_before_discount)}</span>
                    <span>{`-${savePercent}%`}</span>
                </div>
            </div>
        </Link>
    )
}

export default Phone
