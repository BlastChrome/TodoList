const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // ... rest of your webpack config
    module: {
        rules: [
            // ... your other loaders, like babel-loader
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        // ... your other plugins
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
};
