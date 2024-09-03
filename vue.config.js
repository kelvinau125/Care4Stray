// vue.config.js
module.exports = {
  runtimeCompiler: true,
};

// server ip address
module.exports = {
  devServer: {
    // proxy: 'http://192.168.0.150:8080/'
    proxy: 'http://localhost:8080/'
  }
};
