/**
 * Archivo que contiene la lógica de la ruta "/api/admin/login" de Heritage
 * @module login
 * @autor Ana María García Sánchez
 */


 // Variables que deben ser inicializadas a null porque sólo pueden ser utilizadas cuando estamos en la parte del servidor.
var fileS = null;
var crypt = null;
var jwt = null;

import getConfig from 'next/config';
import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';

const { serverRuntimeConfig } = getConfig();
const logger = require('pino')()

// Comprobación de que estamos en el lado del servidor y podemos inicializar las variables
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
    jwt = require('jsonwebtoken');
}

export default apiHandler(handler); //se exporta el apiHandler para que se peuda comprobar si se accede a la ruta como administrador o no.

/**
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un POST).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "authenticate" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

/**
 * Método asíncrono que recibe un usuario y contraseña e inicia sesión con ellos si es válido.
 * @async
 * @function authenticate
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha iniciado sesión u otro de error según lo que haya ocurrido
 */
async function authenticate(req, res) {

    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }

    var admins = require('/data/admin.json');
    var admin = null;
    if (fileS != null && crypt != null) { //Si no existen, no estamos en el lado del servidor y no se puede ejecutar el método
        var dataMap = new Map(req.body);

        var dataCorrect = isDataCorrect(dataMap.get("username"), dataMap.get("password"));
        if(!dataCorrect){
            logger.error("Error intentando iniciar sesión, nombre de usuario o contraseña vacíos.")
            res.status(404).json({ result: "error", message: "Error intentando iniciar sesión, nombre de usuario o contraseña vacíos." })
        }

        var usernameInList = isUsernameInList(admins, dataMap.get("username"))
        if(!usernameInList){
            logger.error("Username no existe.")
            res.status(404).json({ result: "error", message: "Datos incorrectos." })
            return;
        }

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
                    res.status(400).json({ result: "error", message: "Datos incorrectos." })
                }
                return;
            }
        }
        logger.warn('Usuario: ' + admin.username + 'no existe.')
        res.status(400).json({ result: "error", message: "Datos incorrectos." })
    }
}
/**
 * Método para comprobar que los datos que llegan están en el formato correcto (no están vacíos, por ejemplo)
 * @function isDataCorrect
 * @param {String} username Nombre de usuario
 * @param {String} password Contraseña
 * @returns True si es correcto, False si no
 */
export function isDataCorrect(username, password){
    return !validateService.checkEmpty(username) && !validateService.checkEmpty(password)
}
/**
 * Método que comprueba si el nombre de usuario está registrado.
 * @function isUsernameInList
 * @param {List} admins Lista de administradores registardos
 * @param {String} username Nombre de usuario
 * @returns True si está en la lista, False si no
 */
export function isUsernameInList(admins, username){
    return validateService.checkRepeatedUsername(admins, username)
}