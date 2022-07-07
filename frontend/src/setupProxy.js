const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/1360000/",
    createProxyMiddleware({
      target: "http://apis.data.go.kr/",
      changeOrigin: true,
    })
  );
};
