var esClient = null;
const logger = require('pino')()
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
        case 'POST':
            return getLast(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}


async function getLast (req, res) {
    if (esClient != null) {
        let dataMap = new Map(req.body);
        let body = {"query": {"match_all": {}},"size": "1","sort": [{"timestamp": {"order": "desc"}}]}
    await esClient.search({
        index: dataMap.get("index"),
        body: body
    })
        .then(
            response => {
              logger.info('Se ha retornado la última carta del index: '+dataMap.get("index")+".")
              res.status(200).json({result: "ok", message: {hits: response.body.hits.hits}})
            },
            err => {
              logger.error('Ha habido un error intentando retornar la última carta del index: '+dataMap.get("index")+".")
              logger.error('Ha habido un error intentando retornar la última carta del index: '+dataMap.get("index")+".")
              res.status(404).json({result: "error", message: err.message + " on elastic search"})
            }
        );
}
else {
    logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
    res.status(500).json({ result: "error", message: "No elasticsearch client"});
}
}