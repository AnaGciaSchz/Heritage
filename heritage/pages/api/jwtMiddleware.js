const { expressjwt } = require('express-jwt');
const util = require('util');
import getConfig from 'next/config';


const { serverRuntimeConfig } = getConfig();

export default function jwtMiddleware(req, res) {
    if (expressjwt != null && util != null) {
        const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
            path: [
                '/api/admin/login',
                '/api/card/getCard',
                '/api/card/lastCard',
                '/api/card/search',
                '/api/history/getInfo',
                '/api/create'

            ]
        });

        return util.promisify(middleware)(req, res);
    }
}