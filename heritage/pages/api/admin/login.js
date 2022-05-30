var fileS = null;
var crypt = null;
var jwt = null;
import getConfig from 'next/config';
import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';
const { serverRuntimeConfig } = getConfig();
const logger = require('pino')()
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
    jwt = require('jsonwebtoken');
}

var admins = require('/data/admin.json');
var admin = null;

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}


async function authenticate(req, res) {
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (fileS != null && crypt != null) {
        var dataMap = new Map(req.body);
        var i = 0;
        for (i; i < admins.length; i++) {
            if (admins[i].username == dataMap.get("username")) {
                var password = admins[i].password;
                admin = admins[i]
                var match = await crypt.compare(dataMap.get("password"), password)
                if (match) {
                    const token = jwt.sign({ sub: admin.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
                    logger.info('El usuario ' + admin.username + ' acaba de iniciar sesion.')
                    return res.status(200).json({
                        id: admin.id,
                        username: admin.username,
                        name: admin.name,
                        token
                    });
                } else {
                    logger.warn('Contrasena incorrecta para acceder como usuario ' + admin.username + '.')
                    res.status(400).json({ result: "error", message: "ContrasenaNoCorrecta" })
                }
            }
            return;
        }
    }
}