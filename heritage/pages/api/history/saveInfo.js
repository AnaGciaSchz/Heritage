/**
 * Archivo que contiene la lógica de la ruta "/api/history/saveInfo" de Heritage
 * @module saveInfo
 * @autor Ana María García Sánchez
 */

 // Variable que debe ser inicializada a null porque sólo puede ser utilizada cuando estamos en la parte del servidor.
var fileS = null;

import { validateService } from '../../../services/validate.service';
import apiHandler from '../handlers/apiHandler';

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
 * @returns Resultado de la función "saveTheInfo" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return saveTheInfo(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

/**
 * Método asíncrono que recibe un idioma y el contenido de la historia de la EII correspondiente y lo guarda.
 * @async
 * @function saveTheInfo
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha guardado u otro de error según lo que haya ocurrido
 */
async function saveTheInfo(req, res) {
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (fileS != null) {
        let dataMap = new Map(req.body);
        var dataCorrect = isDataCorrect(dataMap.get("locale"), dataMap.get("data"));
        if(!dataCorrect){
            logger.error("Error intentando guardar la historia de la EII, idioma incorrecto o datos vacíos.")
            res.status(404).json({ result: "error", message: "Error intentando guardar la historia de la EII, idioma incorrecto o datos vacíos." })
            return;
        }
        fileS.writeFile('public/history/' + dataMap.get("locale") + '.html', dataMap.get("data"), 'utf8', (err, data) => {
            if (err) {
                logger.error("Error intentando actualizar la historia de la EII del idioma: " + dataMap.get("locale") + ".")
                logger.error(err.message)
                res.status(400).json({ result: "error", message: err })
            } else {
                logger.info("Se ha actualizado correctamente la historia de la EII del idioma: " + dataMap.get("locale") + ".")
                res.status(200).json({ result: "ok", message: data })
            }
        });
    }
}

/**
 * Método que comprueba si el locale es válido y los datos no son vacíos.
 * @function isDataCorrect
 * @param {String} locale 
 * @param {String} data 
 * @returns True si es válido, false si no
 */
export function isDataCorrect(locale, data){
    return validateService.checkIsValidlocale(locale) && !validateService.checkEmpty(data)
}