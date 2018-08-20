import React from 'react'
import ReactDOM from 'react-dom'
import { init } from 'react-enhanced'
import { HashRouter as Router } from 'react-router-dom'
// 重置样式
import 'normalize.css'
import '@styles/index.less'
import App from './App'
import registerServiceWorker from '@/registerServiceWorker'

const { Provider } = init({
    warehouse: []
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
