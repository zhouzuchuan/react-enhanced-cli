const { extractApi } = require('api-manage')
const api = require('../api')
const { apiGetPackageList } = extractApi(api)

const { DM } = global


module.exports = {
    [`GET ${apiGetPackageList}`]: (req, res) => {
        setTimeout(() => {
            return res.json({
                status: 1,
                message: '成功',
                result: [DM.packageList, DM.RelypackageList]
            })
        }, 1000)
    }
}
