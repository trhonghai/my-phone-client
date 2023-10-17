import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import images from '~/assets/images'
import config from '~/config'
import { userSelector } from '~/redux/selectors'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const location = useLocation()
    const currentPath = location.pathname
    const currentUser = useSelector(userSelector)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to='/' className={cx('logo')}>
                    <img src={images.logo} alt='logo' />
                </Link>

                <div className={cx('right')}>
                    {currentUser ? (
                        <div>User</div>
                    ) : (
                        <>
                            <Link
                                to={config.routes.login}
                                className={cx('navigate', { active: currentPath === config.routes.login })}
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to={config.routes.register}
                                className={cx('navigate', { active: currentPath === config.routes.register })}
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                    <Link
                        to={config.routes.cart}
                        className={cx('navigate', { active: currentPath === config.routes.cart })}
                    >
                        Giỏ hàng
                        <Icon icon='mdi:cart' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
