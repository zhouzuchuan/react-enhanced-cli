import * as React from 'react';
import { connect, bindActionCreators, component } from 'react-enhanced';
import Logo from '@c/Logo';
import * as s from './index.less';

const { Loading } = component;

interface Iprops {
    getPackageList: any;
    packageList: any;
}

@connect(
    ({ home }: any) => ({
        packageList: home.get('packageList')
    }),
    (dispatch: any) =>
        bindActionCreators(
            {
                getPackageList: () => ({
                    type: 'home/getPackageList'
                })
            },
            dispatch
        )
)
export default class HomePage extends React.Component<Iprops> {
    componentDidMount() {
        this.props.getPackageList();
    }
    render() {
        const { packageList } = this.props;
        return (
            <div className={s['re-box']}>
                <header>
                    <Logo />
                    <h1 className="mt10">Welcome to React</h1>
                </header>

                <p className="mt30 pt20">
                    For guide and recipes on how to configure / customize this project, check out the
                    <a className={s.link} href="https://github.com/zhouzuchuan/react-enhanced-cli" target="_blank">
                        react-enhanced-cli
                    </a>
                </p>

                <p className="mt30">
                    To get started, edit <code>src/pages/index/App.js</code> and save to reload.
                </p>

                <Loading className="mt30" include="serveGetPackageList">
                    {packageList.map((item: any, index: number) => (
                        <div className={s['package-list']} key={index}>
                            <h3>{item.get('name')}</h3>
                            <ul className="lay-list">
                                {item.get('list').map((v: any, i: number) => (
                                    <li key={i}>
                                        <a className={s.link} href={v.get('src')} target="_blank">
                                            {v.get('name')}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Loading>
            </div>
        );
    }
}
