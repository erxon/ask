//Compile and Bundle server-side code
const path = require('path');
const webpack = require('webpack');
const CURRENT_WORKING_DIR = process.cwd();
const nodeExternals = require('webpack-node-externals');

const config = { 
    name: "server",
    //webpack will start bundling in ./server/server.js
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],
    target: "node",
    //the output path after the bundling
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
    rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            }
        ]
    }
}

module.exports = config;