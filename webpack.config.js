module.exports={
    devtool:'source-map',
    entry: './src/index.js',
    output: {
        path: __dirname+'/public',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test:/\.json$/,
                loader:'json-loader'
            },
            {
                test:/\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase:"./public",

        historyApiFallback:true,
        inline:true,
        port:9000
    }
};