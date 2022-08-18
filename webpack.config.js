const {ModuleFederationPlugin} = require('webpack').container;
const deps = require('./package.json').dependencies;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
    entry: "./src/index",
    output: {
        publicPath: "http://localhost:3001"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 3001,
        historyApiFallback: true
    },
    target: "web",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx|css|svg)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ],
            },
            // Additional configuration to handle *.css files
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'reactDemoJL', // Nombre con el que se llamará desde otro Micro-front
            filename: 'reactDemo.js',
            runtime: 'mf-runtime-react-demo',
            remotes: {}, //aplicaciones de otros providers, componentes externos
            exposes: {
                './Header': "./src/Header.js",
                './Footer': "./src/Footer.js"
            },
            shared: {
                // adds react as shared module
                ...deps,
                react: {
                    requiredVersion: deps.react,
                    singleton: true,
                },
                "react-dom": {
                    singleton:true,
                    requiredVersion: deps["react-dom"]
                }

            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
};
