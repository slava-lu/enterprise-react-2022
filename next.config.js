const nextTranslate = require('next-translate')

const conf = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shop',
        permanent: true,
      },
    ]
  },
}

module.exports = nextTranslate(conf)
