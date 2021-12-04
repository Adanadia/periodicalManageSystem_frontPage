module.exports = {
    configureWebpack:{
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://123.60.34.212:8081',
                    changOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    }
}
//用假数据注释掉