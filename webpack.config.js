const path = require('path');

module.exports = {
    // Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
    mode:'none',
    // Entrance file(to be transpilled)
    entry: {
        // npm install --save-dev babel-polyfill babel-preset-stage-0 async await fecth polyfill
        app: ['babel-polyfill','./src/app.js']
    },
    // Where and how its gonna be delivered
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    // Take care of the loaders eg: babel-loader, css-loader, style-loader
    module: {
        rules: [{
            // testing which file this loader will apply
            test:/\.js?$/,
            exclude:/node_modules/,
            // Defining the loader
            loader:'babel-loader',
            // Defining the presets
            query:{
                presets: ['env', 'stage-0']
            }
        }]
    }
}