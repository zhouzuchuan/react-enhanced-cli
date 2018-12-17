/**
 * home api
 * */

module.exports = ({ server }) => ({
    get: {
        // 获取包列表
        apiGetPackageList: `${server}/getPackageList`
    }
})
