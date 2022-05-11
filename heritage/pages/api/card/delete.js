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
        console.log("borrar")
        let dataMap = new Map(req.body);
    await esClient.delete({
        index: dataMap.get("index"),
        id: dataMap.get("id")
    })
        .then(
            response => {
              res.status(200).json({result: "ok", message: "Card deleted"})
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