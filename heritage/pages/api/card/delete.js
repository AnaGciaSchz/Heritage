/**
 * Archivo que contiene la lógica de la ruta "/api/card/delete" de Heritage
 * @module delete
 * @autor Ana María García Sánchez
 */

 // Variables que deben ser inicializadas a null porque sólo pueden ser utilizadas cuando estamos en la parte del servidor.
var esClient = null;
const logger = require('pino')()

import { validateService } from '../../../services/validate.service';
import apiHandler from '../handlers/apiHandler';

// Comprobación de que estamos en el lado del servidor y podemos inicializar las variables
if (typeof window === 'undefined') {
    const { Client } = require('@elastic/elasticsearch')

    var esClient = new Client({
        node: process.env['ELASTICSEARCH_NODE'],
        auth: {
            username: process.env['ELASTICSEARCH_USERNAME'],
            password: process.env['ELASCTIC_PASSWORD']
        }
    })
}

export default apiHandler(handler); //se exporta el apiHandler para que se peuda comprobar si se accede a la ruta como administrador o no.

/**
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un DELETE).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "deleteCard" si es un DELETE o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
    switch (req.method) {
        case 'DELETE':
            return deleteCard(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

/**
 * Método asíncrono que recibe un índice y un id de carta y la elimina de ElasticSearch después de hacer comprobaciones.
 * @function deleteCard
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha eliminado u otro de error según lo que haya ocurrido
 */
async function deleteCard(req, res) {

    if (!validateService.checkExistsBody(JSON.parse(req.body))) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (esClient == null) { //Si no existen, no estamos en el lado del servidor y no se puede ejecutar el método
        logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
        res.status(500).json({ message: "No elasticsearch client" });
    }
        let dataMap = new Map(JSON.parse(req.body));
        var deleteResponse = await deleteCardFromElastic(dataMap.get("index"), dataMap.get("id"));

        if(deleteResponse.result == "ok"){
            logger.info('Se ha eliminado la carta de id: ' + dataMap.get("id") + 'e index: ' + dataMap.get("index") + ".")
            res.status(200).json({ message: deleteResponse.message })
        }else{
            logger.error('Error en ElasticSearch al intentar eliminar la carta de id: ' + dataMap.get("id") + 'e index: ' + dataMap.get("index") + ".")
                logger.error(deleteResponse.message)
                res.status(404).json({message: deleteResponse.message})
        }

}

/**
 * Método que elimina la carta de ElasticSearch directamente con el índice y el id de esta.
 * @async
 * @function deleteCardFromElastic
 * @param {String} index Índice de la carta
 * @param {String} id Id de la carta
 * @returns Mensaje de que se ha eliminado la carta, mensaje de error si no.
 */
export async function deleteCardFromElastic(index, id){
    if(validateService.checkEmpty(index) || validateService.checkEmpty(id) || validateService.checkNotValidIndex(index)){
        return { result: "error", message: "Error: El id y el índice de la carta no pueden ser vacíos"}
    }
    return await esClient.delete({
        index: index,
        id: id
    })
        .then(
            response => {
                return { result: "ok", message: "Card deleted" }
            },
            err => {
                return { result: "error", message: err.message}
            }
        );
}

