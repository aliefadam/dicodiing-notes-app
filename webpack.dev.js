const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");
const { watchFile } = require("fs");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    watchFiles: ["index.html", "assets/**/*"],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
