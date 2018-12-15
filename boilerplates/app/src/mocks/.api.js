// api储存

module.exports = {
    // 载入api目录清单
    api: require('api-manage').extractApi(require('../api')),

    // 接口返回统一格式
    returnAcition(res, result = {}, options = {}) {
        setTimeout(
            () =>
                res.json({
                    status: '0001',
                    message: '成功',
                    result: [],
                    ...result
                }),
            options.delay || 1000
        )
    }
}
