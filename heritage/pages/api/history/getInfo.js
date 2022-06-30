/**
 * Archivo que contiene la lógica de la ruta "/api/history/getInfo" de Heritage
 * @module getInfo
 * @autor Ana María García Sánchez
 */

 // Variable que debe ser inicializada a null porque sólo puede ser utilizada cuando estamos en la parte del servidor.
var fileS = null;

import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';

const logger = require('pino')()

// Comprobación de que estamos en el lado del servidor y podemos inicializar la variable
if (typeof window === 'undefined') {
    var fileS = require('fs');
}

export default apiHandler(handler); //se exporta el apiHandler para que se peuda comprobar si se accede a la ruta como administrador o no.

/**
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un POST).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "getTheInfo" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return getTheInfo(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

/**
 * Método asíncrono que recibe un locale y devuelve la historia de la EII correspondiente si es válido.
 * @async
 * @function getTheInfo
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha devuelto la información u otro de error según lo que haya ocurrido
 */
async function getTheInfo(req, res) {
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (fileS != null) {
        let dataMap = new Map(req.body);
        var localeCorrect = isLocaleCorrect(dataMap.get("locale"));
        if(!localeCorrect){
            logger.error("Error intentando leer la historia de la EII, idioma incorrecto.")
            res.status(404).json({ result: "error", message: "Error intentando leer la historia de la EII, idioma incorrecto."})
            return;
        }
        fileS.readFile('public/history/' + dataMap.get("locale") + '.html', 'utf8', (err, data) => {
            if (err) {
                logger.error("Error intentando leer la historia de la EII del idioma: " + dataMap.get("locale") + ".")
                logger.error(err.message)
                res.status(400).json({ result: "error", message: err })
            } else {
                logger.info("Se ha devuelto correctamente la historia de la EII del idioma: " + dataMap.get("locale") + ".")
                res.status(200).json({ result: "error", message: data })
            }
        });
    }
}

/**
 * Método que comprueba si el locale es válido
 * @function isLocaleCorrect
 * @param {*} locale 
 * @returns True si es válido, false si no
 */
export function isLocaleCorrect(locale){
    return validateService.checkIsValidlocale(locale)
}