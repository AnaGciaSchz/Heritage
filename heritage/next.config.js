const path = require('path')

/**
 * Este codigo facilita el acceder a estas carpetas. De esta forma, no
 * tengo que escribir la ruta completa cada vez que tenga que acceder
 * a ellas. Mirar pages/_app.js para ver un ejemplo
 */
module.exports = {
    env: {
        ELASCTIC_PASSWORD: "12345",
        ELASTICSEARCH_NODE: "http://localhost:9200",
        ELASTICSEARCH_USERNAME: "elastic"
    },
    serverRuntimeConfig: {
        secret: 'Petra'
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