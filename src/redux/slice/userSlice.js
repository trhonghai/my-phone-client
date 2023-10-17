import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem('user')),
    reducers: {
        login(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },

        logout() {
            return null
        }
    }
})

export default userSlice
