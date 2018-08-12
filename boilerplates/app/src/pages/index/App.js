import React, { Component } from 'react'
import logo from './logo.svg'
import s from './app.less'

class App extends Component {
    render() {
        return (
            <div className={s['re-box']}>
                <header>
                    <img alt="logo"
                        src={logo}
                    />
                    <h1>你好，React-Enhanced</h1>
                </header>
                <p>
                    To get started, edit <code>src/pages/index/App.js</code> and save to reload.
                </p>
            </div>
        )
    }
}

export default App
