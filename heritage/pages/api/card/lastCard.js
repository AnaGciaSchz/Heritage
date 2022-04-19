import { getSortedRoutes } from 'next/dist/shared/lib/router/utils';

var esClient = null;
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

export default async (req, res) => {
    if (esClient != null) {
        let dataMap = new Map(JSON.parse(req.body));
        let body = {"query": {"match_all": {}},"size": "1","sort": [{"timestamp": {"order": "desc"}}]}
    await esClient.search({
        index: dataMap.get("index"),
        body: body
    })
        .then(
            response => {
              res.status(200).json({result: "ok", message: {hits: response.body.hits.hits}})
            },
            err => {
              res.status(404).json({result: "error", message: err.message + " on elastic search"})
            }
        );
}
else {
    res.status(500).json({ result: "error", message: "No elasticsearch client"});
}
}