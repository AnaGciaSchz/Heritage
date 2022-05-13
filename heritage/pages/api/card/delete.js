var esClient = null;
var fileS = null;

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

export default async (req, res) => {
    if (esClient != null) {
        let dataMap = new Map(req.body);
    await esClient.delete({
        index: dataMap.get("index"),
        id: dataMap.get("id")
    })
        .then(
            response => {
                const path = "public/"+dataMap.get("image");
                fileS.unlink(path, (err) => {
                if (err) {
                    console.log(err)
                    console.log({result: "ok", message: "Card deleted but not the image"})
                    res.status(200).json({result: "ok", message: "Card deleted but not the image"})
                }else{
                    console.log({result: "ok", message: "Card deleted with image"})
                     res.status(200).json({result: "ok", message: "Card deleted with image"}) 
                    }
                })
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

