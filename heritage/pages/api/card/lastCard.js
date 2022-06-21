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

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return getLast(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}


async function getLast(req, res) {
    if (!validateService.checkExistsBody(req.body)) {
        res.status(404).json({ result: "error", message: "Body not found" })
        return;
    }
    if (esClient == null) {
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

export async function searchLastCard(index){
    if(validateService.checkEmpty(index) || validateService.checkNotValidIndex(index)){
        return { result: "error", message: "Index of cards must not be empty"}
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