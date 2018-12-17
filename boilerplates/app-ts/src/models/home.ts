import { fromJS } from 'immutable';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

const nameList = ['Installed CLI Package', 'Installed CLI Rely Package'];

export default ({ request }: any) => {
    // 获取通过request包装后的api服务
    const { serveGetPackageList } = request('$service', 'serveGetPackageList');

    return {
        // model 名称
        namespace: 'home',
        // 默认数据
        state: fromJS({
            packageList: []
        }),
        /**
         *
         * 这里的副作用分别通过 redux-observable 的 epics 和 redux-saga 的 effects 来实现
         * 根据习惯 选择其中之一即可，个人建议采用epics来组织副作用，因为它是基于rxjs响应式编程实现，对于复杂的异步交互更加得心应手，但是其学习门槛比较高，谨慎选择
         *
         */
        epics: {
            getPackageList: (epic$: any) =>
                epic$.pipe(
                    switchMap(() =>
                        from(serveGetPackageList()).pipe(
                            map((v: any[]) => ({
                                type: 'home/setState',
                                payload: v.map((o: any, i: number) => ({ name: nameList[i], list: o }))
                            }))
                        )
                    )
                )
        },
        // effects: {
        //     *getPackageList(action, { put, call }) {
        //         const data = yield call(serveGetPackageList)
        //         if (data) {
        //             yield put({
        //                 type: 'home/setState',
        //                 payload: data.map((v, i) => ({ name: nameList[i], list: v }))
        //             })
        //         }
        //     }
        // },
        reducers: {
            setState: (state: any, { payload }: any) => state.set('packageList', fromJS(payload))
        }
    };
};
