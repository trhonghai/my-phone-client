import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userSlice } from '~/redux/slice'
import api from '~/utils/api'
import { removeUser } from '~/utils/localStorages'

function useLogout() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const logout = async (data) => {
        setLoading(true)

        try {
            const response = await api.post('/users/logout', data)

            removeUser()
            dispatch(userSlice.actions.logout())

            return {
                success: true,
                message: response.data.message
            }
        } catch (err) {
            return {
                success: false,
                message: err.response.data.message
            }
        } finally {
            setLoading(false)
        }
    }

    return { logout, loading }
}

export default useLogout
