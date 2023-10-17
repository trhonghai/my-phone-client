import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom'

import Wrapper from './Wrapper'
import routes from './routes'
import { useSelector } from 'react-redux'
import { userSelector } from './redux/selectors'

function App() {
    const currentUser = useSelector(userSelector)

    return (
        <div className='App'>
            <Router>
                <Wrapper>
                    {routes.map((route, index) => {
                        const Layout = route.layout
                        const Page = route.component
                        const RouteComponent = (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                        const NavigateComponent = (
                            <Route key={index} path={route.path} element={<Navigate to={route.redirect} />} />
                        )

                        if (route.protected) {
                            if (currentUser) {
                                return RouteComponent
                            }

                            return NavigateComponent
                        } else if (route.redirect && currentUser) {
                            return NavigateComponent
                        }

                        return RouteComponent
                    })}
                </Wrapper>
            </Router>
        </div>
    )
}

export default App
