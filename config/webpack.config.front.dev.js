const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const path = require('path');


// project folder
const rootFolder = path.resolve(process.cwd());

// for ext.
const regExps = {
    ts: /\.tsx?$/,
    js: /\.js$/,
    img: /\.(png|jpg|jpeg|ico)$/,
    font: /\.(ttf|woff|woff2|eot|otf)$/
};

const config = {

    context: `${rootFolder}`,

    entry: {
        // main file
        index: path.join(rootFolder, '/src/render/index.tsx')
    },

    output: {
        // output path
        path: path.join(rootFolder, '/assets/js/'),

        // file name pattern for entry scripts
        filename: 'bundle.js'
    },

    target: 'node',

    module: {
        rules: [
            // rule for TypeScript
            {
                test: regExps.ts,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true 
                        }
                    }
                ]
            },
            {
                test: regExps.js,
                use: 'source-map-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new CheckerPlugin(),
        
        new ForkTsCheckerWebpackPlugin(),
    ],

    devtool: 'source-map'
};

module.exports = config;