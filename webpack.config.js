/**
 * Created by os-huzp on 2016/11/23.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: "./src/main.js",
    output: {
        /*filename: "build/build.js",
         path:__dirname*/
        filename: "build.js",
        path:__dirname+'/build/'

    },
    /*entry: {
        "main": "./src/main.js",
        "index": "./src/bind.js"
    },
    output: {
        filename: "build/[name].bundle.js"
    },*/
    module: {
        loaders: [
           /* //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: "style!css" },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/,    loader: "jsx-loader" }*/
            /*{
                test:/\.less$/,
                // loader:"style!css!less"
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!' +
                    'less?sourceMap'
                )
            }*/
            {test: /.css$/, loader: 'style!css'},
            {test: /.(png|jpg)$/, loader: 'url?limit=8192'}
            /*{
                test:/\.js$/,
                loader:"babel",
                exclude:'/node_modules/'
            }*/
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [new ExtractTextPlugin('styles.css')]
};