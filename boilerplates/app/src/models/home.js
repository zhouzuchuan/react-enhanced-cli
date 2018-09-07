import { fromJS } from 'immutable'

export default {
    // model 名称
    namespace: 'home',
    // 默认数据
    state: fromJS({
        packageList: []
    }),
    //
    effects: {
        *dataGroup({ payload }, { put }) {
            const nameList = ['Installed CLI Package', 'Installed CLI Rely Package']
            yield put({
                type: 'home/get_success',
                payload: payload.map((v, i) => ({ name: nameList[i], list: v }))
            })
        }
    },
    //
    reducers: {
        get_success(state, { payload }) {
            return state.set('packageList', fromJS(payload))
        }
    }
}
