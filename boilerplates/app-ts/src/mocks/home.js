// const { Random } = require('mockjs')

const {
    DM: {
        api: { apiGetPackageList },
        relypackageList,
        packageList,
        returnAcition
    }
} = global

module.exports = {
    [apiGetPackageList]: (req, res) => {
        returnAcition(res, {
            result: [packageList, relypackageList]
        })
    }
}
