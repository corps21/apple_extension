import path from 'path'
import {Configuration} from 'webpack'
import CopyWebpackPlugin from "copy-webpack-plugin"

const config: Configuration = {
    entry: {
        background: "./src/background.ts",
        content: "./src/content.ts",
        popup: "./src/popup.ts"
    },

    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader:"ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    plugins: [
        new CopyWebpackPlugin({patterns: [{from: "static", to: "static"}]})
    ]
}

export default config