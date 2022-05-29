const path = require('path')

module.exports = {
    devIndicators: {
        buildActivity: false
    },
    env: {
        ELASCTIC_PASSWORD: process.env['ELASCTIC_PASSWORD'],
        ELASTICSEARCH_NODE: process.env['ELASTICSEARCH_NODE'],
        ELASTICSEARCH_USERNAME: process.env['ELASTICSEARCH_USERNAME']
    },
    serverRuntimeConfig: {
        secret: process.env['SECRET']
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    },
    i18n: {
        locales: ['en', 'es', 'ast'],
        defaultLocale: 'es',

    },
    webpack: (config) => {
        config.resolve.alias['components'] = path.join(__dirname,
            'components');
        config.resolve.alias[`public`] = path.join(__dirname, 'public');
        config.resolve.alias[`logic`] = path.join(__dirname, 'logic');

        return config;
    }

}