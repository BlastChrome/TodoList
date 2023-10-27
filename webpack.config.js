const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },

    mode: "development",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        runtimeChunk: false
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },

        ],
    },
};