import * as React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom"
import loadable from '@loadable/component'

const HomeComponent = loadable(() => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */ '@views/home'));
// const AboutComponent = loadable(() => import('@views/home'));

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Route exact path='/' component={HomeComponent}></Route>
                </Router>
            </div>
        )
    }
}

export default App