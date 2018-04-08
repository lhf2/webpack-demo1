const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//将css文件打包为一个单独文件
module.exports = {
    entry:"./app/addImage.js",//入口文件
    output:{
        path:path.resolve(__dirname,'bulid'),//必须使用绝对文件，输出文件夹
        filename:'bundle.js',//打包之后输出文件的文件名
        //publicPath:'bulid/'//知道如何寻找资源
    },
    module:{
        rules:[
            {
                test:/\.js$/,//js文件才使用babel
                use:'babel-loader',//使用哪个loader
                exclude:/node_modules/,//不包括路径
            },
            {
                //图片格式正则
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        //配置url-loader的可选项
                        options:{
                            //限制图片大小2000B 小于限制会将图片转换为base64格式 1M = 1024KB 1KB =1024字节
                            limit:2000000,
                            //超出限制，创建的文件格式
                            //bulid/images/[图片名].[hash].[图片格式]
                            name:'imgaes/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            /*正常的写法
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true//css文件中的代码被加到了style标签中
                        }
                    }
                ]
            }*/
            //使用分离插件之后的写法
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({
                    //必须这样写，否则会报错
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    }]
                })
            }
        ]
    },
    //插件列表
    plugins:[
        //输出的文件路径 分离css代码
        new ExtractTextPlugin('css/[name].[hash].css'),
        new HtmlWebpackPlugin({
            title:'webpack练习demo',//标题
            template:'index.html',//文件模板
            filename:'test.html',//文件名
            inject:true,//默认 script标签位于html文件的body的底部
        })
    ]
}