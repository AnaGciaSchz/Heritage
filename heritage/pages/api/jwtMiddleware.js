const expressJwt = require('express-jwt');
const util = require('util');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressJwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            '/',
            '/es',
            '/en',
            '/ast',
            '/HistoriaEII',
            '/es/HistoriaEII',
            '/en/HistoriaEII',
            '/ast/HistoriaEII',
            '/ZonaEgresados',
            '/es/ZonaEgresados',
            '/en/ZonaEgresados',
            '/ast/ZonaEgresados',
            '/ZonaProfesorado',
            '/es/ZonaProfesorado',
            '/en/ZonaProfesorado',
            '/ast/ZonaProfesorado',
            '/ZonaDelegacion',
            '/es/ZonaDelegacion',
            '/en/ZonaDelegacion',
            '/ast/ZonaDelegacion',
            '/about',
            '/es/about',
            '/en/about',
            '/ast/about',
            '/Contacto',
            '/es/Contacto',
            '/en/Contacto',
            '/ast/Contacto',
            '/heritage_admin_login',
            '/es/heritage_admin_login',
            '/en/heritage_admin_login',
            '/ast/heritage_admin_login',
            '/500',
            '/es/500',
            '/en/500',
            '/ast/500',
        ]
    });

    return util.promisify(middleware)(req, res);
}