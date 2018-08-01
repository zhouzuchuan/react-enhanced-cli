import React from 'react'
import ReactDOM from 'react-dom'
import { init } from 'react-enhanced'
// 重置样式
import 'normalize.css'
import App from './App'
import registerServiceWorker from '@/registerServiceWorker'

const { Provider } = init({
    warehouse: []
})

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
