import React from 'react'
import ReactDOM from 'react-dom'
import { init } from 'react-enhanced'
import { HashRouter as Router } from 'react-router-dom'
import registerServiceWorker from '@rw'
import App from './App'
import apiList from '@/api'
// 重置样式
import 'normalize.css'
import '@s/reset.css'
import '@s/index.less'

const { Provider } = init({
    warehouse: [], // 仓库名
    resultLimit: 'result',
    loading: 0,
    apiList
})

ReactDOM.render(
    <Provider>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
