const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    index: path.resolve(__dirname, "src", "index.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "bin"),
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.build.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    react: "react",
  },
};
