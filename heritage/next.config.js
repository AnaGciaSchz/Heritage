const path = require ('path')

/**
 * Este codigo facilita el acceder a estas carpetas. De esta forma, no
 * tengo que escribir la ruta completa cada vez que tenga que acceder
 * a ellas. Mirar pages/_app.js para ver un ejemplo
 */
module.exports = {
    i18n: {
        locales: ['en', 'es', 'as'],
        defaultLocale: 'es',
    
    },
    webpack: config => {
        config.resolve.alias['components'] = path.join(__dirname,
            'components');
        config.resolve.alias[`public`] = path.join(__dirname,'public');
        config.resolve.alias[`logic`] = path.join(__dirname,'logic');

        return config;
    }

}