const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

require('babel-polyfill');

const env = process.env.NODE_ENV;

config = {
    entry: ['babel-polyfill', './src/index.js'],
    mode: env,
    output: {
        path: path.join(__dirname, '../server/public'),
        filename: './javascripts/bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                        {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0']
                        }                
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader'
                ],
            }, 
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]'
            }, 
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[hash].[ext]'
            }, 
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=./fonts/[hash].[ext]'
            }, 
            {
                test: /\.ico$/,
                use: 'url-loader?limit=100000&name=./images/[hash].[ext]'
            },  
            {
                test: /\.png$/,
                use: 'url-loader?limit=100000&name=./images/[hash].[ext]'
            }, 
            {
                test: /\.jpg$/,
                use: 'file-loader?limit=100000&name=./images/[hash].[ext]'
            }
        ]
    },
    devServer:{
        port: 8080,
        historyApiFallback: true
    },
    // optimization: {
    //     minimizer: [
    //       new UglifyJsPlugin({
    //         cache: true,
    //         parallel: true,
    //         sourceMap: true // set to true if you want JS source maps
    //       }),
    //       new OptimizeCSSAssetsPlugin({})
    //     ]
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.template.html'
        }),
        new MiniCssExtractPlugin({
            filename: './stylesheets/stylesheet.css'
        })
    ]
}

module.exports = config;