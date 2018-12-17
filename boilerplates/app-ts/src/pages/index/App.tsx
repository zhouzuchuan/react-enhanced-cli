import * as React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { asyncComponent } from 'react-enhanced';

import * as s from './app.less';

export default class App extends React.Component {
    state = {
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
    };
    render() {
        const { menuData } = this.state;
        return [
            <div className={s['header-box']} key="header">
                {menuData.map(({ name, path }) => (
                    <NavLink activeClassName={s.active} exact={true} key={name} strict={true} to={path}>
                        {name}
                    </NavLink>
                ))}
            </div>,
            <Route key="body" render={this.routeRender} />
        ];
    }
    private routeRender = ({ match }: { match: any }) => (
        <Switch>
            <Route
                component={asyncComponent({
                    component: () => import('@cn/Home'),
                    model: () => import('@m/home')
                })}
                exact={true}
                path="/"
            />
            <Route component={asyncComponent(() => import('@cn/About'))} exact={true} path="/about" />
        </Switch>
    );
}
