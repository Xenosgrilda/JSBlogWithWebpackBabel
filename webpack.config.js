const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/app.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 9000
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
