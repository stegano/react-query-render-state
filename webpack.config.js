const path = require("path");

module.exports = [
  {
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
      "@tanstack/react-query": "@tanstack/react-query",
      "react-render-state": "react-render-state",
    },
  },
  {
    mode: "production",
    target: "node",
    entry: {
      index: path.resolve(__dirname, "src", "index.ts"),
    },
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "[name].esm.js",
      path: path.resolve(__dirname, "bin"),
      library: {
        type: "module",
      },
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
      "@tanstack/react-query": "@tanstack/react-query",
      "react-render-state": "react-render-state",
    },
  },
];
