import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import { Link } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import s from './app.less'

class App extends Component {
    render() {
        return (
            <div className={s['re-box']}>
                <header>
                    <img alt="logo"
                        src={logo}
                    />
                    <h1>
                        你好， React-Enhanced
                        <a href="https://github.com/zhouzuchuan/react-enhanced"
                            target="_blank"
                        >
                            <Icon className="ml5"
                                type="github"
                            />
                        </a>
                    </h1>
                </header>

                <section>
                    To get started, edit <code>src/pages/index/App.js</code> and save to reload.
                </section>
            </div>
        )
    }
}

export default App
