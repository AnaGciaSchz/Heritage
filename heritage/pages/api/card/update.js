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
        let dataMap = new Map(req.body);
    await esClient.update({
        index: dataMap.get("index"),
        id: dataMap.get("id"),
        body: {
            doc: {
            name: dataMap.get("name"),
            promotion: dataMap.get("promotion"),
            registry: dataMap.get("registry"),
            timestamp: dataMap.get("timestamp"),
            shortDescription: dataMap.get("shortDescription"),
            longDescription: dataMap.get("longDescription"),
            professionalArchievements: dataMap.get("archievements"),
            Red1:dataMap.has("social1Text")?dataMap.get("social1Text"):"",
            Red1Link: dataMap.has("social1")?dataMap.get("social1"):"",
            Red2: dataMap.has("social2Text")?dataMap.get("social2Text"):"",
            Red2Link: dataMap.has("social2")?dataMap.get("social2"):"",
            Red3: dataMap.has("social3Text")?dataMap.get("social3Text"):"",
            Red3Link: dataMap.has("social3")?dataMap.get("social3"):"",
            AppearsInAnotherCategory: dataMap.get("check"),
            image: "/cardImages/"+dataMap.get("image")
            }
        }
    })
        .then(
            response => {
              res.status(200).json({result: "ok", message: "Card updated"})
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