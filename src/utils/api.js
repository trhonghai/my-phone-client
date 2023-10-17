import axios from 'axios'
import jwtDecode from 'jwt-decode'

import store from '~/redux/store'
import saveTokens from './saveTokens'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL // http://localhost:8000
})

const isAccessTokenExpired = (access_token) => {
    const { exp } = jwtDecode(access_token)

    return Date.now() >= exp * 1000
}

// Hàm để gọi API refresh token
const callRefreshTokenAPI = async (refresh_token) => {
    try {
        const response = await axios.post(
            '/users/refresh-token',
            { refresh_token },
            { baseURL: process.env.REACT_APP_API_URL }
        )

        // Lấy access token mới và refresh token mới từ response
        const new_access_token = response.data.result.access_token
        const new_refresh_token = response.data.result.refresh_token

        // Lưu access token mới và refresh token mới vào local storage
        saveTokens(new_access_token, new_refresh_token)

        // Trả về access token mới và refresh token mới
        return { new_access_token, new_refresh_token }
    } catch (error) {
        throw error
    }
}

// Thêm interceptor cho request
api.interceptors.request.use(
    async (config) => {
        // Lấy user từ local storage
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            const access_token = user.access_token

            // Kiểm tra nếu access token hết hạn
            if (access_token && isAccessTokenExpired(access_token)) {
                const refresh_token = user.refresh_token
                const { new_access_token, new_refresh_token } = await callRefreshTokenAPI(refresh_token)

                // Cập nhật access token mới và refresh token mới vào redux store
                store.dispatch({
                    type: 'user/login',
                    payload: {
                        access_token: new_access_token,
                        refresh_token: new_refresh_token
                    }
                })

                // Cập nhật access token mới vào header của request
                config.headers.Authorization = `Bearer ${new_access_token}`

                return config
            }
        }

        // Nếu access token chưa hết hạn, trả về request config ban đầu
        return config
    },
    (error) => {
        console.log('error', error)
        return Promise.reject(error)
    }
)

export default api
