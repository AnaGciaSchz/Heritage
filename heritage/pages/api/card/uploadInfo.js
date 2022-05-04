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

function deleteTemporalData (){
        var fs = require('fs');
        var path = require('path');
      var directory = './public/temporalImages';
    
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
}

  export default async (req, res) => {
      var dataMap = new Map(req.body);
    esClient.index({
        index: dataMap.get("index"),
        body: {
            "name": dataMap.get("name"),
            "promotion": dataMap.get("promotion"),
            "registry": dataMap.get("registry"),
            "timestamp": dataMap.get("timestamp"),
            "shortDescription": dataMap.get("shortDescription"),
            "longDescription": dataMap.get("longDescription"),
            "professionalArchievements": dataMap.get("archievements"),
            "Red1":dataMap.has("social1Text")?dataMap.get("social1Text"):"",
            "Red1Link": dataMap.has("social1")?dataMap.get("social1"):"",
            "Red2": dataMap.has("social2Text")?dataMap.get("social2Text"):"",
            "Red2Link": dataMap.has("social2")?dataMap.get("social2"):"",
            "Red3": dataMap.has("social3Text")?dataMap.get("social3Text"):"",
            "Red3Link": dataMap.has("social3")?dataMap.get("social3"):"",
            "AppearsInAnotherCategory": dataMap.get("check"),
            "image": "/cardImages/"+dataMap.get("image")
        }
    }).then(
        () => {
            console.log({result: "ok", message: "The card was added to elastic search"});
            deleteTemporalData();
           res.status(200).json({result: "ok", message: "The card was added to elastic search"})
        },
        err => {
            console.log({result: "error", message: err.message + " on elastic search"});
            res.status(500).json({result: "error", message: err.message + " on elastic search"})
        }
    );
  }
