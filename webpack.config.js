var webpack = require('webpack')
var fs = require('fs')
var path = require('path')
var getConfig = require('./context.config')

const clientDir = process.cwd()

const defaultTarget = './examples'
let dirStr = process.argv.find(arg => /^targetDir\=.+/.test(arg)), targetDir
if(dirStr) targetDir = dirStr.replace('targetDir=', '')
else targetDir = defaultTarget

if(!fs.existsSync(path.join(clientDir, targetDir)))  {
  throw new Error(`Invalid argumnet: targetDir=<path>`)
  //targetDir ${eol}use: webpack-dev-server --define targetDir=<path>${eol}use: npm start -- --define 
}

const config = getConfig(targetDir, path.join(clientDir, targetDir))

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/only-dev-server',
    path.join(clientDir, targetDir, '/entry.js')
  ],
  output: {
    //path: path.join(clientDir, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.md$/, loader: 'html-loader!markdown-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2016", "stage-2"],
            plugins: ["transform-react-jsx"]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.definitions),
    new webpack.NormalModuleReplacementPlugin(...config.replacement)
    //new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    "prop-types": "PropTypes",
    "react": "React",
    "react-dom": "ReactDOM",
    "ultra": "ultra"
  }
};

