module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
        } else {
            config.devServer = {
                host: '0.0.0.0',
                port: '8081',
            }
        }
    }
}
