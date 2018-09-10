import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { Install } from 'react-enhanced'

import s from './app.less'

@Install(['AsyncComponent', 'Loading'])
class App extends Component {
    constructor() {
        super()
        this.state = {
            menuData: [
                {
                    name: 'Home',
                    path: '/'
                },
                {
                    name: 'About',
                    path: '/about'
                }
            ]
        }
    }
    render() {
        const { AsyncComponent, Loading } = this.props
        const { menuData } = this.state
        return [
            <div className={s['header-box']}
                key="header"
            >
                {menuData.map(({ name, path }) => (
                    <NavLink activeClassName={s.active}
                        exact
                        key={name}
                        strict
                        to={path}
                    >
                        {name}
                    </NavLink>
                ))}
            </div>,
            <Route
                key="body"
                render={() => {
                    return (
                        <Switch>
                            <Route
                                component={AsyncComponent({
                                    component: () => import('@cn/Home'),
                                    model: () => import('@m/home')
                                })}
                                exact
                                path="/"
                            />
                            <Route component={AsyncComponent(() => import('@cn/About'))}
                                exact
                                path="/about"
                            />
                        </Switch>
                    )
                }}
            />,
            <Loading className={s['loading-mask']}
                include="serveGetPackageList"
                key="loading"
            />
        ]
    }
}

export default App
