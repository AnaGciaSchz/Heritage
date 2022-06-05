var esClient = null;
const logger = require('pino')()
import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';
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

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' 
      }
  }
}
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return uploadInfo(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function uploadInfo(req, res) {
  if (!validateService.checkExistsBody(req.body)) {
    res.status(404).json({ result: "error", message: "Body not found" })
    return;
  }

  if(esClient == null){
    logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
    res.status(500).json({ result: "error", message: "No elasticsearch client" });
  }

    var dataMap = new Map(req.body);

    var uploadResponse = await uploadToElastic(dataMap)

    if(uploadResponse.result == "ok"){
      logger.info("Se ha añadido la carta con id: " + dataMap.get("id")
        + " correspondiente a: " + dataMap.get("name") + " en el índice: " + dataMap.get("index") + ".")
        res.status(200).json({ result: "ok", message: uploadResponse.message })
      }
      else{
        logger.error("Ha habido un error en elastic al intentar añadir la carta con id: " + dataMap.get("id")
        + " correspondiente a: " + dataMap.get("name") + " en el índice: " + dataMap.get("index") + ".")
      logger.error(uploadResponse.message)
            res.status(400).json({message: searchResponse.message + " on elastic search"})
      }
    
}

export async function uploadToElastic(dataMap){
  if(!validateService.checkIsValidUploadDataMap(dataMap) || !dataMap.has("index")){
    logger.error("Error: Faltan datos para crear una carta.")
    return { result: "error", message: "The card lacks important data: Name, Promotion, short description, long sescription, archievements or image." };
  } 
  var body = getBody(dataMap);
 return esClient.index({
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

export function getBody(dataMap){

  return ({
  "name": dataMap.get("name"),
  "promotion": dataMap.get("promotion"),
  "registry": dataMap.get("registry"),
  "timestamp": dataMap.get("timestamp"),
  "shortDescription": dataMap.get("shortDescription"),
  "longDescription": dataMap.get("longDescription"),
  "professionalArchievements": dataMap.get("archievements"),
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
