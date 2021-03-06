#!/usr/bin/env node

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");

const options = {
	contentBase: webpackConfig.context,
	inline: true,
  historyApiFallback: true,
  stats: { colors: true }
};

const server = new WebpackDevServer(Webpack(webpackConfig), options);

server.listen(8080, "localhost", function(err) {
	if (err) {
		console.log(err)
	}
	console.log("Starting server on http://localhost:8080");
});
