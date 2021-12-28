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
        let body = getBody(dataMap.get("query"));
    await esClient.search({
        index: dataMap.get("index"),
        body: body
    })
        .then(
            response => {
              res.status(200).json({result: "ok", message: {hits: response.body.hits.hits, aggregation: response.body.aggregations.by_promotion.buckets}})
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

function getBody(query){
    let body = {
    "size": 1000,
    "query": 
      getBool(query)
    ,
    "sort": [
      {
        "_score": {
          "order": "desc"
        },
        "name.keyword": {
          "order": "asc"
        }
      }
    ],
    "aggs": {
      "by_promotion": {
        "terms": {
            "field": "promotion",
            "size": "1000",
            "exclude": [
              ""
            ],
            "order": [
                {
                  "_key": "asc"
                }
              ]
        },
        "aggs": {
          "by_top_hit": {
            "top_hits": {
              "size": "100"
            }
          },
          "max_score": {
            "max": {
              "script": "_score"
            }
          }
        }
      }
    }
  }
  return body;
}

function getBool(query){
    /** 
    let filterQuery = getFilter(filter);
    if(filterQuery != null){
        return {"bool": { "must": [ getQuery(query) ], "filter": [filterQuery]}}
    }*/
    return {"bool": { "must": [ getQuery(query) ]}
}
}

/** 
function getFilter(filter){
    if(filter == undefined){
        return null
    }
    let array = filter.split(",");
    let filterQuery = "";
    for(let i=0;i<array.length;i++){
        filterQuery = filterQuery + JSON.stringify({"term": {"appCategories": array[i]}});
          if(i!= array.length-1){
            filterQuery = filterQuery + ",";
          }
    }
    
    filterQuery = '{"bool": {"must": [ '+filterQuery+' ]}}';
    
    return JSON.parse(filterQuery);

}
*/

function getQuery(query){
    if(query ==undefined || query == "" || query.replace(" ","") ==""){
        return {"match_all": {}};
    }
    return {
        "multi_match": {
          "query": query,
          "type": "bool_prefix",
          "fields": [
            "name^1"
          ],
          "tie_breaker": 0.01
        }
      }
}

/**
 * {
  "size": "10000",
  "query": {
    "bool": {
      "must": [
        {
          "match_all": {}
        }
      ]
    }
  },
  "sort": [
    {
      "_score": {
        "order": "desc"
      },
      "name.keyword": {
        "order": "asc"
      }
    }
  ],
  "aggs": {
    "by_promotion": {
      "terms": {
        "field": "promotion",
        "size": "1000",
        "exclude": [
          ""
        ],
        "order": [
          {
            "_key": "asc"
          }
        ]
      },
      "aggs": {
        "by_top_hit": {
          "top_hits": {
            "size": "100"
          }
        },
        "max_score": {
          "max": {
            "script": "_score"
          }
        }
      }
    }
  }
}
 */