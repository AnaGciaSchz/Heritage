/**
 * Archivo que contiene la lógica de la ruta "/api/card/lastCard" de Heritage
 * @module lastCard
 * @autor Ana María García Sánchez
 */

 // Variable que debe ser inicializada a null porque sólo puede ser utilizada cuando estamos en la parte del servidor.
var esClient = null;

import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';

const logger = require('pino')()

// Comprobación de que estamos en el lado del servidor y podemos inicializar la variable
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
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un POST).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "getLast" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return getLast(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

/**
 * Método asíncrono que recibe un índice y devuelve la última carta que contiene si es válido (según fecha).
 * @async
 * @function getLast
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha devuelto la carta u otro de error según lo que haya ocurrido
 */
async function getLast(req, res) {
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (esClient == null) {//Si no existe, no estamos en el lado del servidor y no se puede ejecutar el método
        logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
        res.status(500).json({ message: "No elasticsearch client" });
    }
        let dataMap = new Map(req.body);
        var response = await searchLastCard(dataMap.get("index"))
        if(response.result == "ok"){
            logger.info('Se ha retornado la última carta del index: ' + dataMap.get("index") + ".")
            res.status(200).json({ hits: response.message.hits })
        }
        else{
            logger.error('Ha habido un error intentando retornar la última carta del index: ' + dataMap.get("index") + ".")
            logger.error('Ha habido un error intentando retornar la última carta del index: ' + dataMap.get("index") + ".")
            res.status(404).json({  message: response.message})

        }
}

/**
 * Método que realiza la búsqueda en ElasticSearch
 * @async
 * @function searchLastCard
 * @param {String} index Índice de la carta
 * @returns Mensaje de que se ha retornado la carta correctamente o de erro según lo que haya ocurrido.
 */
export async function searchLastCard(index){
    if(validateService.checkEmpty(index) || validateService.checkNotValidIndex(index)){
        return { result: "error", message: "El índice no debe ser vacío"}
      }
    return await esClient.search({
        index: index,
        body: { "query": { "match_all": {} }, "size": "1", "sort": [{ "timestamp": { "order": "desc" } }] }
    })
        .then(
            response => {
                return { result: "ok", message: { hits: response.body.hits.hits } }
            },
            err => {
                return { result: "error", message: err.message + " on elastic search" }
            }
        );
}