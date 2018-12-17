import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { init } from 'react-enhanced';
import { HashRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import registerServiceWorker from '@rw';
import App from './App';
import * as apiList from '@/api';

// 重置样式
import 'normalize.css';
import '@s/commonly.less';

const { Provider } = init({
    warehouse: [], // 仓库名
    resultLimit: 'result',
    api: {
        // 指定api挂载的仓库名
        name: '$service',
        list: apiList
    }
});

ReactDOM.render(
    <Provider>
        <Router>
            <LocaleProvider locale={zhCN}>
                <App />
            </LocaleProvider>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
