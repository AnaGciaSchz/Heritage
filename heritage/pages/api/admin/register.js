/**
 * Archivo que contiene la lógica de la ruta "/api/admin/register" de Heritage
 * @module register
 * @autor Ana María García Sánchez
 */
 // Variables que deben ser inicializadas a null porque sólo pueden ser utilizadas cuando estamos en la parte del servidor.
var fileS = null;
var crypt = null;

import apiHandler from "../handlers/apiHandler";
import { validateService } from "../../../services/validate.service";

const logger = require('pino')()

// Comprobación de que estamos en el lado del servidor y podemos inicializar las variables
if (typeof window === 'undefined') {
    var fileS = require('fs');
    var crypt = require('bcrypt');
}

export default apiHandler(handler); //se exporta el apiHandler para que se peuda comprobar si se accede a la ruta como administrador o no.

/**
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un POST).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "registerUser" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

/**
 * Método asíncrono que recibe un usuario, nombre y contraseñas y los registra si son es válidos.
 * @async
 * @function registerUser
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha registrado al usuario u otro de error según lo que haya ocurrido
 */
async function registerUser(req, res) {

    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (fileS != null && crypt != null) { //Si no existen, no estamos en el lado del servidor y no se puede ejecutar el método

        const saltRounds = process.env['SALT_ROUNDS'];
        var admins = require('/data/admin.json');

        var dataMap = new Map(req.body);

        var isCorrect = checkInformation(admins, dataMap, res);

        if (isCorrect.result == "error"){
            res.status(400).json({message: isCorrect.message })
            return;
        }

        crypt.genSalt(parseInt(saltRounds), function (err, salt) {
            crypt.hash(dataMap.get("password"), salt, function (err, hash) {
                if (err) throw err;
                dataMap.set("passwordHash", hash);
                addNewAdmin(dataMap, hash, res)
            });
        });
    }

}

/**
 * Método para comprobar que la información recibida es válida para que el usuario sea regsitrado.
 * @function checkInformation
 * @param {List} admins Lista de administradores registardos
 * @param {Map} dataMap Mapa con la información recibida
 * @returns True si la información es válida, False si no
 */
export function checkInformation(admins, dataMap) {
    var usernameLength = validateService.checkLength(dataMap.get("username"), 20)
    var repeatedUsername = validateService.checkRepeatedUsername(admins, dataMap.get("username"));
    var nameChecks = validateService.checkLength(dataMap.get("name"), 35);
    var passwordCheck = !validateService.checkSecurePassword(dataMap.get("password"));
    var passwordsAreTheSame = validateService.checkValidPasswords(dataMap.get("password"), dataMap.get("repeatPassword"))

    if (!usernameLength) {
        logger.warn('Intento de registro fallido: No hay username.')
        return { result: "error", message: "EscribeUsername" }
    }

    if (repeatedUsername) {
        logger.warn('Intento de registro fallido: Nombre de usuario en uso: ' + dataMap.get("username"))
        return { result: "error", message: "NombreDeUsuarioEnUso" }
    }

    if (!nameChecks) {
        logger.warn('Intento de registro fallido: No se ha especificado nombre del admin.')
        return { result: "error", message: "EscribeNombre" }
    }

    if (passwordCheck || !passwordsAreTheSame) {
        logger.warn('Intento de registro fallido: No se ha especificado contrasena o es insegura.')
        return { result: "error", message: "EscribeContrasena" }
    }
    return {result: "ok"}
}

/**
 * Método para añadir al nuevo administrador a la lista.
 * @function addNewAdmin
 * @param {Map} dataMap Mapa con la información recibida
 * @param {String} hash Hash de la contraseña
 * @param {Object} res Objeto para devolver una respuesta 
 * @returns Mensaje indicando que se ha registrado, mensaje de error si no.
 */
function addNewAdmin(dataMap, hash, res) {
    var admins = require('/data/admin.json');
    var adminId = admins.length + 1;
    var date = new Date();
    var dateCreated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "Z"
    var dateUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "Z"


    let newAdmin = {
        id: adminId,
        username: dataMap.get("username"),
        name: dataMap.get("name"),
        password: hash,
        created: dateCreated,
        updated: dateUpdated
    };

    admins.push(newAdmin)

    var writeAdmins = JSON.stringify(admins, null, 2);

    fileS.writeFileSync('data/admin.json', writeAdmins, err => {
        if (err) {logger.info('Ha habido un error: '+err.message)
        res.status(200).json({ result: "error", message: 'Ha habido un error: '+err.message })};
    });
    logger.info('El usuario ' + newAdmin.username + ' acaba de ser registrado.')
    res.status(200).json({ result: "ok", message: "Everything ok" })
}