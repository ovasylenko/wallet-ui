const CracoAlias = require("craco-alias");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  devServer: (devServerConfig) => {
    devServerConfig.writeToDisk = true;
    return devServerConfig;
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
