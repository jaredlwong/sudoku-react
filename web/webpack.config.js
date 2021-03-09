const path = require("path");

// 1. import default from the plugin module
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

// 2. create a transformer;
// the factory additionally accepts an options object which described below
const styledComponentsTransformer = createStyledComponentsTransformer();

// 3. add getCustomTransformer method to the loader config

module.exports = {
  mode: "development",

  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
