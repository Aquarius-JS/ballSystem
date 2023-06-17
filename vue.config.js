const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		proxy: {
			"/api": {
				target: "http://43.139.80.148:8080",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
		// proxy:'http://43.139.80.148:8080'
	},
});
