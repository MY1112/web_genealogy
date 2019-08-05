/*
 * @Author: mengyuan 
 * @Date: 2019-08-01 17:36:12 
 * @Last Modified by: mengyuan
 * @Last Modified time: 2019-08-01 17:38:32
 */
module.exports = {
    host: '127.0.0.1',
    port: 3000,
    proxy: [{
        path: '/log/api/v2/**',
        target: 'http://log.dev.dtstack.net:81',
        changeOrigin: true
    }]
}