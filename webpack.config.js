module.exports = {
  entry: "./js/app.js",
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js"
  },
  // loaders...
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader"
        // },
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
