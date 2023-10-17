import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from '~/App'
import GlobalStyles from '~/components/GlobalStyles'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>
    // </React.StrictMode>
)

reportWebVitals()
