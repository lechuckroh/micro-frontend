module.exports = {
    webpack: {
        configure: (config, env) => {
            config.optimization.runtimeChunk = false;
            config.optimization.splitChunks = {
              cacheGroups: {
                default: false,
              },
            };
        
            config.output.filename = "static/js/[name].js";
            
            const miniCssExtractPlugin = config.plugins.find(plugin => plugin.constructor.name === "MiniCssExtractPlugin");
            if (miniCssExtractPlugin) {
                const opts = miniCssExtractPlugin.options;
                opts.filename = "static/css/[name].css";
                opts.moduleFilename = () => "static/css/main.css";
            }

            return config;
        },
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        }
    },
};
