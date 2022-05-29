var esClient = null;
var fileS = null;
const logger = require('pino')()
import { validateService } from '../../../services/validate.service';
import apiHandler from '../handlers/apiHandler';

if (typeof window === 'undefined') {
    var fileS = require('fs');
    const { Client } = require('@elastic/elasticsearch')

    var esClient = new Client({
        node: process.env['ELASTICSEARCH_NODE'],
        auth: {
            username: process.env['ELASTICSEARCH_USERNAME'],
            password: process.env['ELASCTIC_PASSWORD']
        }
    })
}

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'DELETE':
            return deleteCard(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function deleteCard (req, res) {
    if(!validateService.checkExistsBody(req.body)){
        res.status(404).json({result: "error", message: "Body not found"})
        return;
    }
    if (esClient != null) {
        let dataMap = new Map(JSON.parse(req.body));
    await esClient.delete({
        index: dataMap.get("index"),
        id: dataMap.get("id")
    })
        .then(
            response => {
                if(dataMap.get("AppearsInAnotherCategory").toString()=="false"){
                const path = "public/"+dataMap.get("image");
                fileS.unlink(path, (err) => {
                if (err) {
                    logger.error('Se ha eliminado la carta de id: '+dataMap.get("id")+'e index: '+dataMap.get("index")+" pero no la imagen del usuario del sistema.")
                    res.status(200).json({result: "ok", message: "Card deleted but not the image"})
                }else{
                    logger.info('Se ha eliminado la carta de id: '+dataMap.get("id")+'e index: '+dataMap.get("index")+".")
                     res.status(200).json({result: "ok", message: "Card deleted with image"}) 
                    }
                })
            }else{
                logger.info('No se ha eliminado la imagen de la carta de id: '+dataMap.get("id")+'e index: '+dataMap.get("index")+" porque se utiliza en otra carta.")
                res.status(200).json({result: "ok", message: "Card deleted but not the image"})
            }
            },
            err => {
                logger.error('Error en elastic al intentar eliminar la carta de id: '+dataMap.get("id")+'e index: '+dataMap.get("index")+".")
                logger.error(err.message)
              res.status(404).json({result: "error", message: err.message + " on elastic search"})
            }
        );
}
else {
    logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
    res.status(500).json({ result: "error", message: "No elasticsearch client"});
}
}

