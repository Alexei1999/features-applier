const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "featuresApplier",
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "./"),
    ],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
