const [server, client] = require('nullstack/webpack.config')

const path = require('path')

function customClient(...args) {
  const config = client(...args)
  const cssRule = config.module.rules.find((rule) => rule.test.test('.css'))
  cssRule.use.push({
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
        },
      },
    },
  })
  return config
}

function configPath(original) {
  return (...args) => {
    const config = original(...args)
    config.resolve.alias = {
      '@utils': path.resolve(__dirname, './src/utils'),
    }

    return config
  }
}

const configs = [server, customClient].map((config) => configPath(config))

module.exports = configs
