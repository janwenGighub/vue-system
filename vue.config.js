// module.exports = {
//   baseUrl: './',
//   productionSourceMap: false,
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         pathRewrite: {
//           '/api': ''
//         }
//       },
//       '/ms': {
//         target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
//         changeOrigin: true
//       }
//     }
//   }

// }

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://f-bee.com', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}