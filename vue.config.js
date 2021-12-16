module.exports = {
    configureWebpack:{
        devServer: {
            proxy: {
                '/api': {
                    // target: 'http://123.60.34.212:8081',
                    target: "http://127.0.0.1:8081",
                    changOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    }
}
