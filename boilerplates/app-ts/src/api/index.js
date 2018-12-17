const { bindApi } = require('api-manage')

module.exports = bindApi([require('./home')], {
    // 目录清单注入server
    server: ''
})
