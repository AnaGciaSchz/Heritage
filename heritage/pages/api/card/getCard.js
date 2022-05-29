var esClient = null;
import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';
if (typeof window === 'undefined') {
    const { Client } = require('@elastic/elasticsearch')
    const logger = require('pino')()

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
            return getTheCard(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}


async function getTheCard(req, res) {
    if(!validateService.checkExistsBody(req.body)){
        res.status(404).json({result: "error", message: "Body not found"})
        return;
    }
    if (esClient != null) {
        let dataMap = new Map(req.body);
        let body = {"query": { "bool": {"filter": {"term": {"_id": dataMap.get("id")}}}}}
    await esClient.search({
        index: dataMap.get("index"),
        body: body
    })
        .then(
            response => {
                logger.info('Se ha retornado la carta de id: '+dataMap.get("id")+'e index: '+dataMap.get("index")+".")
              res.status(200).json({result: "ok", message: {hits: response.body.hits.hits}})
            },
            err => {
                logger.error('Ha habido un error intentando retornar la carta de id: '+dataMap.get("id")+'e index: '+dataMap.get("index")+".")
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