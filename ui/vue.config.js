const debug = process.env.NODE_ENV !== 'production'
const name = process.env.VUE_APP_TITLE || '开发工具'
module.exports = {
    // 用于确定在开发环境还是生成环境
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 打包文件输出目录
    outputDir: 'dist',
    // 放置生成的静态资源目录
    assetsDir: 'static',
    pages: {
        index:{
            // page 的入口
            entry: 'src/main.ts',
            // 模板来源
            template: 'public/index.html',
            // 修改模板引擎title
            title: name,
            // 在 dist/index.html 的输出
            filename: 'index.html'
        }
    },
    // 是否在保存的时候使用eslint-loader进行检查
    lintOnSave: process.env.NODE_ENV === 'development',
    // 是否为生产环境构建生产 source  map
    productionSourceMap: false,
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                // target: 'http://39.103.231.26:7001',//这里后台的地址模拟的;应该填写你们真实的后台接口
                // target: 'http://192.168.100.99:7001',//这里后台的地址模拟的;应该填写你们真实的后台接口
                target: 'http://127.0.0.1:7001',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: false, // 是否启用websockets
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }

        },
    },
    configureWebpack: config => {
        if (debug) { // 开发环境配置
            config.devtool = 'source-map'
        }
    },
    css: {
        // css预设配置项
        loaderOptions: {
            sass: {
                implementation: require('sass'), // This line must in sass option
            }
        }
    }
}
