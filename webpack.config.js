const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const dev = process.env.NODE_ENV === "dev"

let cssLoader = [{ loader: 'css-loader', options: { importLoaders: 1 } }];
let rename = [];

if(!dev){
  cssLoader.push({
    loader: 'postcss-loader',
    options: {          
      plugins: (loader) => [
        require('autoprefixer')()
      ]
    }
  })
  rename = [{
    loader: StringReplacePlugin.replace({
      replacements: [
          {
              pattern: /https:\/\/preview\./g,
              replacement: function () {
                  return "https://";
              }
          }
      ]})
  }]
} 



let config = {
  entry: "./app/assets/js/app.es6",

  output: {
    path: dev ? path.resolve(__dirname, "public") : path.resolve(__dirname, "../CS2/public"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "main.js", // string
    publicPath: "/public/" // string
  },
  devtool: dev ? "cheap-module-eval-source-map" : false,
  watch: dev,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader", ...rename]
      },
      {
        test: /\.es6$/,
        exclude:  /(node_modules|bower_components)/,       
        loader: "babel-loader",
        options: {
          presets: [
            ["env", {
              "modules": false
            }]
          ], //config from babel           
          plugins: ["syntax-dynamic-import","transform-es2015-parameters"]
        },   
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: cssLoader
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [...cssLoader, ...rename, "sass-loader"]
        })
      },
      {
        test: /\?(png|jpe?g|gif)$/,
        use:[
          {
            loader: 'file-loader'
          }
        ]
      }
    ],  

   
    
  },
  plugins: [
    new ExtractTextPlugin("site.css"),
  ],
}

if (!dev){
  config.plugins.push(new UglifyJSPlugin());
  config.plugins.push(new StringReplacePlugin());
}

module.exports = config;