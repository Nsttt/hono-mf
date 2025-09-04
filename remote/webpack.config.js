const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const path = require("path");

module.exports = {
  target: "async-node",
  mode: "production",
  entry: "./src/index.ts",
  devtool: false,
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote1",
      filename: "remoteEntry.js",
      exposes: {
        "./utils": "./src/utils.ts",
        "./api": "./src/api.ts",
        "./app": "./src/index.ts",
      },
      library: { type: "commonjs-module" },
      runtimePlugins: [
        require.resolve("@module-federation/node/runtimePlugin"),
      ],
      remoteType: "script",
      dts: false, // Disable type generation for now
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    publicPath: "auto",
  },
  // externals: {
  //   'hono': 'commonjs hono',
  //   '@hono/node-server': 'commonjs @hono/node-server',
  // },
};
