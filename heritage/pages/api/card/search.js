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
        let body = getBody(dataMap.get("query"), dataMap.get("promotions"), dataMap.get("socials"));
    await esClient.search({
        index: dataMap.get("index"),
        body: body
    })
        .then(
            response => {
              var set = new Set();
              var socials1 = response.body.aggregations.by_social1.buckets
              var socials2 = response.body.aggregations.by_social2.buckets
              var socials3 = response.body.aggregations.by_social3.buckets
              var i;
              for(i=0;i<socials1.length;i++){
                set.add(socials1[i].key)
              }
              for(i=0;i<socials2.length;i++){
                set.add(socials2[i].key)
              }
              for(i=0;i<socials3.length;i++){
                set.add(socials3[i].key)
              }
              var s = [];
              for(i=0;i<set.size;i++){
                s[i] ={ key: [...set][i]};
              }
              res.status(200).json({result: "ok", message: {hits: response.body.hits.hits, promotion: response.body.aggregations.by_promotion.buckets, social: s}})
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

function getBody(query, promotions, socials){
    let body = {
    "size": 1000,
    "query": 
      getBool(query, promotions, socials)
    ,
    "sort": [
      {
        "_score": {
          "order": "desc"
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
      },
      "by_social1": {
        "terms": {
          "field": "Red1",
          "size": "1000",
          "exclude": [
            ""
          ],
          "order": [
            {
              "_key": "asc"
            }
          ]
        }
      },
      "by_social2": {
        "terms": {
          "field": "Red2",
          "size": "1000",
          "exclude": [
            ""
          ],
          "order": [
            {
              "_key": "asc"
            }
          ]
        }
      },
      "by_social3": {
        "terms": {
          "field": "Red3",
          "size": "1000",
          "exclude": [
            ""
          ],
          "order": [
            {
              "_key": "asc"
            }
          ]
        }
      }
    }
  }
  return body;
}

function getBool(query, promotions, socials){
    let filterQuery = getFilter(promotions, socials);
    if(filterQuery != null){
        return {"bool": { "must": [ getQuery(query) ], "filter": filterQuery}}
    }
    return {"bool": { "must": [ getQuery(query) ]}
}
}

function isEmpthyFilter(filter){
  if(filter != undefined && filter != null && filter !=""){
    return false;
  }
  return true;
}


function getFilter(promotions, socials){
  if(isEmpthyFilter(promotions) && isEmpthyFilter(socials)){
    return null;
  }
  var filterPromotions = "";
  var filterSocials = "";
    if(!isEmpthyFilter(promotions)){
      var promFilter = getPromotionsFilter(promotions);
      if(promFilter !=""){ 
      filterPromotions = '"must": [ '+promFilter+' ]'
      }
    }

    if(!isEmpthyFilter(socials)){
      var socFilter = getSocialsFilter(socials);
      if(socFilter != ""){
      filterSocials = '"should": [ '+socFilter+' ]'
      }
  }
  if(filterPromotions != "" && filterSocials != ""){
    filterPromotions+=',';
  }
  let filterQuery = "";
  if(filterSocials != ""){
    filterQuery = '{"bool": {"minimum_should_match": "1",'+filterPromotions+filterSocials+'}}';
  }
  else{
    filterQuery = '{"bool": {'+filterPromotions+filterSocials+'}}';
  }
    
    
    return JSON.parse(filterQuery);

}

function getPromotionsFilter(values){
  let array = values.split(",");
  let filterQuery = "";
  for(let i=0;i<array.length;i++){
      filterQuery = filterQuery + JSON.stringify({"term": { promotion : array[i]}});
        if(i!= array.length-1){
          filterQuery = filterQuery + ",";
        }
  }
  return filterQuery;
}

function getSocialsFilter(values){
  let array = values.split(",");
  let filterQuery = "";
  for(let i=0;i<array.length;i++){
      filterQuery = filterQuery + JSON.stringify({"term": { Red1 : array[i]}})+",";
      filterQuery = filterQuery + JSON.stringify({"term": { Red2 : array[i]}})+",";
      filterQuery = filterQuery + JSON.stringify({"term": { Red3 : array[i]}});
        if(i!= array.length-1){
          filterQuery = filterQuery + ",";
        }
  }
  return filterQuery;
}

function getQuery(query){
    if(query ==undefined || query == "" || query.replace(" ","") ==""){
        return {"match_all": {}};
    }
    return {
        "multi_match": {
          "query": query,
          "type": "bool_prefix",
          "fields": [
            "name^2",
            "shortDescription^1",
            "longDescription^1",
            "professionalArchievements^1",
            "promotion^1",
            "Red1^0.5",
            "Red2^0.5",
            "Red3^0.5"
          ],
          "tie_breaker": 0.01
        }
      }
}