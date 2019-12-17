const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({ 
    template:"./client/index.html",
    filename:"index.html",
    inject:"body"
})
module.exports = {
    entry:"./client/index.js",
    output:{
        path:path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:"babel-loader"
            },
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:"babel-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: true, // webpack@2.x and newer
                    }
                  }
                ]  
            }
        ] 
    },
    plugins:[HtmlWebpackPluginConfig],
    devServer: {
        historyApiFallback: true,
      }
}