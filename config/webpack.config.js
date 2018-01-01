const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // Optimization plugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const path = require('path');


// project folder
const rootFolder = path.resolve(process.cwd());

const config = {

    context: `${rootFolder}`,

    entry: {
        // main file
        index: path.join(rootFolder, '/src/app/index.ts')
    },

    output: {
        // output path
        path: path.join(rootFolder, '/build/'),

        // file name pattern for entry scripts
        filename: '[name].js'
    },

    target: 'node',

    module: {
        rules: [
            // rule for TypeScript
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true 
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    plugins: [
        new CheckerPlugin(),
        
        new ForkTsCheckerWebpackPlugin(),
    
        new UglifyJSPlugin({
            parallel: 4,
            cache: true,
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                warnings: false,
                compress: {
                    drop_console: false
                },
                output: {
                    comments: false,
                    beautify: false,
                }
            }
        })
    ]
};

module.exports = config;