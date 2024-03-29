const path = require('path')//用来解析路径相关信息的模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
//__dirname:代表当前文件所在目录的绝对路径
module.exports = {
    // 模式: 生产环境
    mode: 'production',
    // 入口
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    // 出口(打包生成js)
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 模块加载器
    module: {
        rules: [
            //es6 ==> es5
            {
                test: /\.js$/,//用于匹配文件
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 1000,
                  name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
                }
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        open: true, // 自动打开浏览器
        //quiet: true, // 不做太多日志输出
      },
}