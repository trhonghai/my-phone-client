import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import classNames from 'classnames/bind'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './Slider.module.scss'

const cx = classNames.bind(styles)

function Slider({ data }) {
    const [showContentEffect, setShowContentEffect] = useState(() => {
        const initialShowContentEffect = Array(data.length).fill(false)

        initialShowContentEffect[0] = true

        return initialShowContentEffect
    })
    const sliderRef = useRef(null)

    const handlePrevSlider = () => {
        if (!sliderRef.current) return
        sliderRef.current.swiper.slidePrev()
    }

    const handleNextSlider = () => {
        if (!sliderRef.current) return
        sliderRef.current.swiper.slideNext()
    }

    const handleSlideChange = (swiper) => {
        setShowContentEffect((prevShowContentEffect) =>
            prevShowContentEffect.map((_, index) => index === swiper.realIndex)
        )
    }

    return (
        <div className={cx('wrapper')}>
            <Swiper
                ref={sliderRef}
                className='mySwiper'
                slidesPerView={1}
                loop={true}
                modules={[Autoplay, EffectFade]}
                autoplay={{
                    delay: 5000
                }}
                effect={'fade'}
                onSlideChange={handleSlideChange}
            >
                {data.map((slider, index) => (
                    <SwiperSlide key={index}>
                        <div className={cx('slide')}>
                            <img src={slider.image} alt={slider.heading} />
                            <div className={cx('content', { effect: showContentEffect[index] })}>
                                <h2 className={cx('heading')}>{slider.heading}</h2>
                                <p className={cx('description')}>{slider.desc}</p>
                                <button className={cx('btn')}>Chi tiết</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className={cx('navigation', 'left')} onClick={handlePrevSlider}>
                <Icon icon='ph:caret-left-bold' />
            </button>

            <button className={cx('navigation', 'right')} onClick={handleNextSlider}>
                <Icon icon='ph:caret-right-bold' />
            </button>
        </div>
    )
}

export default Slider
