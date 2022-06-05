var esClient = null;
const logger = require('pino')()
import { validateService } from '../../../services/validate.service';
import apiHandler from '../handlers/apiHandler';

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

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'DELETE':
            return deleteCard(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function deleteCard(req, res) {
    if (!validateService.checkExistsBody(JSON.parse(req.body))) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (esClient == null) {
        logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
        res.status(500).json({ result: "error", message: "No elasticsearch client" });
    }
        let dataMap = new Map(JSON.parse(req.body));
        var deleteResponse = await deleteCardFromElastic(dataMap.get("index"), dataMap.get("id"));

        if(deleteResponse.result == "ok"){
            logger.info('Se ha eliminado la carta de id: ' + dataMap.get("id") + 'e index: ' + dataMap.get("index") + ".")
            res.status(200).json({ result: "ok", message: deleteResponse.message })
        }else{
            logger.error('Error en elastic al intentar eliminar la carta de id: ' + dataMap.get("id") + 'e index: ' + dataMap.get("index") + ".")
                logger.error(deleteResponse.message)
                res.status(404).json({ result: "error", message: deleteResponse.message})
        }

}

export async function deleteCardFromElastic(index, id){
    if(validateService.checkEmpty(index) || validateService.checkEmpty(id)){
        return { result: "error", message: "Index and id of cards must not be empty"}
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

