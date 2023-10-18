
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PhoneDetail.module.scss'
import ReactMarkdown from 'react-markdown'
import api from '~/utils/api'

const cx = classNames.bind(styles)

function PhoneDetail() {
    const [phoneDetail, setPhoneDetail] = useState({})
    // const [selectedColor, setSelectedColor] = useState(null)
    // const [selectedCapacity, setSelectedCapacity] = useState(null)
    

    const id = useParams()

    // call api get a phone
    useEffect(() => {
        api.get(`/phones/${id.phone_id}`)
            .then((res) => {
                const phone = res.data.result
                console.log('phone', phone)
                setPhoneDetail(phone)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [id])



    // const handleColorChange = (color) => {
    //     if (phoneDetail.options.some((option) => option.color === color)) {
    //         setSelectedColor(color)
    //         console.log(color);
    //     }
    // }

    // const handleCapacityChange = (capacity) => {
    //     if (phoneDetail.options.some((option) => option.capacity === capacity)) {
    //         setSelectedCapacity(capacity)
    //         console.log(capacity);
    //     }
    // }

    // const getAvailableColors = () => {
    //     if (!selectedCapacity) {
    //         return []
    //     }
    //     const availableColors = phoneDetail.options
    //         .filter((option) => option.capacity === selectedCapacity)
    //         .map((option) => option.color)

    //     return availableColors
    // }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('information')}>
                    <div className={cx('image')}>
                        <img
                            className={cx('image-img')}
                            src={`http://localhost:8000/static/image/${phoneDetail ? phoneDetail.image : ''}`}
                            alt={phoneDetail ? phoneDetail.name : ''}
                        />
                    </div>
                    <div className={cx('des-phone')}>
                        <h2 className={cx('name')}>{phoneDetail.name}</h2>
                        <div className={cx('brand-name')}>
                            <label>
                                Thương hiệu:
                                <span>{phoneDetail.brand ? phoneDetail.brand.name : ''}</span>
                            </label>
                        </div>
                        <div className={cx('option')}>
                            {phoneDetail.options
                                ?.reduce((uniqueColors, option) => {
                                    if (!uniqueColors.some((color) => color === option.color)) {
                                        uniqueColors.push(option.color)
                                    }
                                    return uniqueColors
                                }, [])
                                .map((color) => (
                                    <button
                                        key={color}
                                        className={cx('option-button', {
                                            // selected: selectedColor && selectedColor.color === color
                                        })}
                                        // onClick={() => handleColorChange(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                        </div>
                        <div className={cx('rom')}>
                            <label>Dung lượng (ROM): 256GB</label>
                        </div>
                        <div className={cx('option-rom')}>
                            {phoneDetail.options
                                ?.reduce((uniqueCapacity, option) => {
                                    if (!uniqueCapacity.some((capacity) => capacity === option.capacity)) {
                                        uniqueCapacity.push(option.capacity)
                                    }
                                    return uniqueCapacity
                                }, [])
                                .map((capacity) => (
                                    <button
                                        key={capacity}
                                        className={cx('option-rom-button', {
                                            // selected: selectedCapacity && selectedCapacity.capacity === capacity
                                        })}
                                        // onClick={() => handleCapacityChange(capacity)}
                                        
                                    >
                                        {capacity}
                                    </button>
                                ))}
                        </div>
                        <div className={cx('price')}>
                            <label className={cx('price-lable')}>
                                Giá:
                                <span>{phoneDetail ? phoneDetail.price : ''}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={cx('wish-cart')}>
                    <div className={cx('wish-cart-infor-gift')}>
                        
                        <img src='https://shopfront-cdn.tekoapis.com/cart/gift-filled.png' />
                        <span className={cx('wish-cart-infor-gift-text')}>1x Mã giảm thêm 20% mua Ốp lưng {phoneDetail.name} series</span>
                    </div>
                    <div className={cx('wish-cart-infor-gift')}>
                        <img src='https://shopfront-cdn.tekoapis.com/cart/gift-filled.png' />
                        <span className={cx('wish-cart-infor-gift-text')}>1x Miếng dán cường lực Kingkong {phoneDetail.name} Pro (quà tặng)</span>
                    </div>
                    <div className={cx('wish-cart-infor')}>
                        <div className={cx('buy-now')}>
                            <button className={cx('buy-now-button')}>Mua ngay</button>
                        </div>
                        <div className={cx('add-to-cart')}>
                            <button className={cx('add-to-cart-button')}>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('description')}>
                <div className={cx('description-text')}>
                    <h2>Mô tả sản phẩm</h2>
                    <ReactMarkdown children={phoneDetail.description} />
                </div>
                <div className={cx('description-para')}>
                    <h2>Thông tin chi tiết</h2>
                    <div className={cx('para-brand')}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Thương hiệu</td>
                                    {phoneDetail.brand
                                        ? phoneDetail.brand.name
                                        : '' && (
                                              <tr>
                                                  <td>{phoneDetail ? phoneDetail.brand.name : ''}</td>
                                              </tr>
                                          )}
                                </tr>
                                Thông tin chung
                                <tr>
                                    <td>Tên sản phẩm</td>
                                    {phoneDetail.name && (
                                        <tr>
                                            <td>{phoneDetail.name}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Màu sắc</td>
                                    <td>Blue Titanium</td>
                                </tr>
                                Màn hình
                                <tr>
                                    <td>Loại màn hình</td>
                                    {phoneDetail.screen_type && (
                                        <tr>
                                            <td>{phoneDetail.screen_type}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Độ phân giải</td>
                                    {phoneDetail.resolution && (
                                        <tr>
                                            <td>{phoneDetail.resolution}</td>
                                        </tr>
                                    )}
                                </tr>
                                Cấu hình
                                <tr>
                                    <td>Dung lượng (ROM)</td>
                                    <td>256GB</td>
                                </tr>
                                <tr>
                                    <td>Hệ điều hành: </td>
                                    {phoneDetail.operating_system && (
                                        <tr>
                                            <td>{phoneDetail.operating_system}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>RAM: </td>
                                    {phoneDetail.memory && (
                                        <tr>
                                            <td>{phoneDetail.memory}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Chip: </td>
                                    {phoneDetail.chip && (
                                        <tr>
                                            <td>{phoneDetail.chip}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Pin: </td>
                                    {phoneDetail.battery && (
                                        <tr>
                                            <td>{phoneDetail.battery}</td>
                                        </tr>
                                    )}
                                </tr>
                                Camera
                                <tr>
                                    <td>Camera trước: </td>
                                    {phoneDetail.front_camera && (
                                        <tr>
                                            <td>{phoneDetail.front_camera}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Camera sau: </td>
                                    {phoneDetail.rear_camera && (
                                        <tr>
                                            <td>{phoneDetail.rear_camera}</td>
                                        </tr>
                                    )}
                                </tr>
                                Kết nối
                                <tr>
                                    <td>Wifi</td>
                                    {phoneDetail.wifi && (
                                        <tr>
                                            <td>{phoneDetail.wifi}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Jack tai nghe</td>
                                    {phoneDetail.jack_phone && (
                                        <tr>
                                            <td>{phoneDetail.jack_phone}</td>
                                        </tr>
                                    )}
                                </tr>
                                Thiết kế và trọng lượng
                                <tr>
                                    <td>Kích thước</td>
                                    {phoneDetail.size && (
                                        <tr>
                                            <td>{phoneDetail.size}</td>
                                        </tr>
                                    )}
                                </tr>
                                <tr>
                                    <td>Khối lượng</td>
                                    {phoneDetail.weight && (
                                        <tr>
                                            <td>{phoneDetail.weight}</td>
                                        </tr>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div />
                </div>
            </div>
        </div>
    )
}

export default PhoneDetail
