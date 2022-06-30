/**
 * Archivo que contiene la lógica de la ruta "/api/card/uploadInfo" de Heritage
 * @module uploadInfo
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

//Configuración para aumentar el límite de lo que puede pesar la petición al uploadInfo
export const config = {
  api: {
      bodyParser: {
          sizeLimit: '10mb' 
      }
  }
}
export default apiHandler(handler); //se exporta el apiHandler para que se peuda comprobar si se accede a la ruta como administrador o no.

/**
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un POST).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "uploadInfo" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return uploadInfo(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

/**
 * Método asíncrono que recibe la información para una carta y la inserta en ElasticSearch si es válida.
 * @async
 * @function uploadInfo
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha insertado la carta u otro de error según lo que haya ocurrido
 */
async function uploadInfo(req, res) {
  if (!validateService.checkExistsBody(req.body)) {
    res.status(404).json({ message: "Body not found" })
    return;
  }

  if(esClient == null){ //Si no existe, no estamos en el lado del servidor y no se puede ejecutar el método
    logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
    res.status(500).json({ message: "No elasticsearch client" });
  }

    var dataMap = new Map(req.body);

    var uploadResponse = await uploadToElastic(dataMap)

    if(uploadResponse.result == "ok"){
      logger.info("Se ha añadido la carta con id: " + dataMap.get("id")
        + " correspondiente a: " + dataMap.get("name") + " en el índice: " + dataMap.get("index") + ".")
        res.status(200).json({message: uploadResponse.message })
      }
      else{
        logger.error("Ha habido un error en ElasticSearch al intentar añadir la carta con id: " + dataMap.get("id")
        + " correspondiente a: " + dataMap.get("name") + " en el índice: " + dataMap.get("index") + ".")
      logger.error(uploadResponse.message)
            res.status(400).json({message: uploadResponse.message + " on elastic search"})
      }
    
}

/**
 * Método que sube la información e ElasticSearch
 * @function uploadToElastic
 * @param {Map} dataMap Mapa con la información recibida
 * @returns Mensaje de que se ha subido la carta o de error según lo ocurrido
 */
export async function uploadToElastic(dataMap){
  if(!validateService.checkIsValidUploadDataMap(dataMap) || !dataMap.has("index") || validateService.checkNotValidIndex(dataMap.get("index"))){
    logger.error("Error: Faltan datos para crear una carta.")
    return { result: "error", message: "A la carta le falta información importante: Nombre, promoción, descripción corta, descripción larga, logros o imagen." };
  } 
  var body = getBody(dataMap);
 return await esClient.index({
    index: dataMap.get("index"),
    body: body
  }).then(
    () => { 
      return { result: "ok", message: "The card was added to elastic search", cardInformation: body }
    },
    err => {
      return { result: "error", message: err.message}
    }
  );

}

/**
 * Método que genera el body para subir la carta a ElasticSearch
 * @function getBody
 * @param {Map} dataMap Mapa con la información recibida
 * @returns El body generado
 */
export function getBody(dataMap){

  return ({
  "name": dataMap.get("name"),
  "promotion": dataMap.get("promotion"),
  "registry": dataMap.get("registry"),
  "timestamp": dataMap.get("timestamp"),
  "shortDescription": dataMap.get("shortDescription"),
  "longDescription": dataMap.get("longDescription"),
  "professionalAchievements": dataMap.get("achievements"),
  "Red1": dataMap.has("social1Text") &&  dataMap.has("social1")? dataMap.get("social1Text") : "",
  "Red1Link": dataMap.has("social1Text") &&  dataMap.has("social1")? dataMap.get("social1") : "",
  "Red2": dataMap.has("social2Text") &&  dataMap.has("social2")? dataMap.get("social2Text") : "",
  "Red2Link": dataMap.has("social2Text") &&  dataMap.has("social2")? dataMap.get("social2") : "",
  "Red3": dataMap.has("social3Text") &&  dataMap.has("social3")? dataMap.get("social3Text") : "",
  "Red3Link": dataMap.has("social3Text") &&  dataMap.has("social3")? dataMap.get("social3") : "",
  "AppearsInAnotherCategory": dataMap.get("check"),
  "image": dataMap.get("image")
  })

}
