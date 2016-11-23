**自我理解
1.在main.html中引入打包后的文件build.js（含相对路径）
2.在webpack.config.js中写好output打包后的路径及文件，在entry中写好入口文件main.js的路径
3.在main.js路径中require其他文件夹下的文件
4.运行命令：webpack(打包)  webpack-p(压缩) webpack-d(调试) webpack-w(实时打包)
5.在1开始之前，npm init(生成package.json文件) npm install -g webpack（全局安装webpack）
webpack --display-error-details（方便出错检查）


**webpack.config.js实例一
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build/build.js"
  },
  module: {
    loaders: [
       //.css 文件使用 style-loader 和 css-loader 来处理
      { test: /\.css$/, loader: "style!css" },
      //.js 文件使用 jsx-loader 来编译处理
      { test: /\.js$/,    loader: "jsx-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: []
};
------------------------------------解释-------------------------------------
entry 是页面中的入口文件，比如我这边的入口文件时main.js

output: 是指页面通过webpack打包后生成的目标文件放在什么地方去，我这边是在根目录下生成build文件夹，该文件夹内有一个build.js文件；

resolve: 定义了解析模块路径时的配置，常用的就是extensions; 可以用来指定模块的后缀，这样在引入模块时就不需要写后缀，会自动补全。

plugins: 定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取公用的部分，生成common.js;

module.loaders：是文件的加载器，比如我们之前react需要在页面中引入jsx的js源码到页面上来，然后使用该语法，但是通过webpack打包后就不需要再引入JSXTransformer.js；看到上面的加载器；比如jsx-loader加载器就是代表JSXTransformer.js的，还有style-loader和css-loader加载器；因此在使用之前我们需要通过命令把它引入到项目上来


**webpack.config.js实例二
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.js",
    path: __dirname + '/assets/',
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      {test: /.css$/, loader: 'style!css'},
      {test: /.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
  resolve: {
extensions: ['', '.js', '.jsx'],
//模块别名定义，方便后续直接引用别名，无须多写长长的地址
alias: {
    a : 'js/assets/a.js',  // 后面直接引用 require(“a”)即可引用到模块
    b : 'js/assets/b.js',
    c : 'js/assets/c.js'
}
  },
  plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")]
}
------------------------------------解释-------------------------------------
module.loader: 其中test是正则表达式，对符合的文件名使用相应的加载器.

/.css$/会匹配 xx.css文件，但是并不适用于xx.sass或者xx.css.zip文件.

url-loader 它会将样式中引用到的图片转为模块来处理; 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式。

entry 模块的入口文件。依赖项数组中所有的文件会按顺序打包，每个文件进行依赖的递归查找，直到所有模块都被打成包；

output：模块的输出文件，其中有如下参数：

filename: 打包后的文件名

path: 打包文件存放的绝对路径。

publicPath: 网站运行时的访问路径。

relolve.extensions: 自动扩展文件的后缀名，比如我们在require模块的时候，可以不用写后缀名的。

relolve.alias: 模块别名定义，方便后续直接引用别名，无须多写长长的地址

plugins 是插件项;


**总结
 Webpack是前端一个工具，可以让各个模块进行加载，预处理，再进行打包，它能有Grunt或Gulp所有基本功能。优点如下：

*支持commonJS和AMD模块。
*支持很多模块加载器的调用，可以使模块加载器灵活定制，比如babel-loader加载器，该加载器能使我们使用ES6的语法来编写代码。
*可以通过配置打包成多个文件，有效的利用浏览器的缓存功能提升性能。
*使用模块加载器，可以支持sass，less等处理器进行打包且支持静态资源样式及图片进行打包