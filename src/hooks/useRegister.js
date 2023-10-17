import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userSlice } from '~/redux/slice'
import { api, saveTokens } from '~/utils'

function useRegister() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const register = async (data) => {
        setLoading(true)

        try {
            const response = await api.post('/users/register', data)
            const { access_token, refresh_token } = response.data.result

            saveTokens(access_token, refresh_token)
            dispatch(userSlice.actions.login(response.data.result))

            return {
                success: true,
                message: response.data.message
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    return { register, loading }
}

export default useRegister
