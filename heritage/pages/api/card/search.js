/**
 * Archivo que contiene la lógica de la ruta "/api/card/search" de Heritage
 * @module search
 * @autor Ana María García Sánchez
 */

 // Variable que debe ser inicializada a null porque sólo puede ser utilizada cuando estamos en la parte del servidor.
var esClient = null;

import apiHandler from '../handlers/apiHandler';
import { validateService } from '../../../services/validate.service';

const logger = require('pino')()

// Comprobación de que estamos en el lado del servidor y podemos inicializar la variable
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

//Configuración para aumentar el límite de lo que puede pesar la respuesta del search
export const config = {
  api: {
      bodyParser: {
          sizeLimit: '10MB' 
      }
  }
}

export default apiHandler(handler); //se exporta el apiHandler para que se peuda comprobar si se accede a la ruta como administrador o no.

/**
 * Método que gestiona la petición, comprobando si el método es válido (e, este caso, si es un POST).
 * @function handler
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Resultado de la función "search" si es un POST o un error 405 indicando que el método no está permitido.
 */
function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return search(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

/**
 * Método asíncrono que recibe una consulta, filtros y ordenaciones y devuelve el resultado de la búsqueda correspondiente en ElasticSearch.
 * @async
 * @function search
 * @param {Objeto} req Petición recibida 
 * @param {Objeto} res Objeto para devolver una respuesta 
 * @returns Un mensaje de que se ha devuelto la búsqueda u otro de error según lo que haya ocurrido
 */
async function search(req, res) {
  if (!validateService.checkExistsBody(req.body)) {
    res.status(404).json({ result: "error", message: "Body not found" })
    return;
  }
  if(esClient == null){//Si no existe, no estamos en el lado del servidor y no se puede ejecutar el método
    logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
    res.status(500).json({ result: "error", message: "No elasticsearch client" });
  }
    let dataMap = new Map(req.body);
    var searchResponse = await searchInElastic(dataMap);
    if(searchResponse.result == "ok"){
    logger.info("Se ha devuelto una búsqueda correctamente del índice: " + dataMap.get("index") + ".")
    res.status(200).json({total: searchResponse.message.total, hits: searchResponse.message.hits, promotion: searchResponse.message.promotion, social: searchResponse.message.social})
    }
    else{
      logger.error("Ha habido un error en ElasticSearch al intentar realizar una búsqueda en el índice : " + dataMap.get("index") + ".")
          logger.error(searchResponse.message)
          res.status(404).json({message: searchResponse.message + " on elastic search"})
    }
}

/**
 * Método que realiza la búsqueda en ElasticSearch
 * @async
 * @function searchInElastic
 * @param {Map} dataMap Mapa con la información recibida
 * @returns  Mensaje de que se ha realizado la búsqueda correctamente o de error según lo ocurrido
 */
export async function searchInElastic(dataMap){
  if(validateService.checkEmpty(dataMap.get("index")) || validateService.checkNotValidIndex(dataMap.get("index"))){
    return { result: "error", message: "El índice no debe ser vacío"}
  }
  let body = getBody(dataMap.get("query"), dataMap.get("promotions"), dataMap.get("socials"), dataMap.get("sort"));
    return await esClient.search({
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
          for (i = 0; i < socials1.length; i++) {
            set.add(socials1[i].key)
          }
          for (i = 0; i < socials2.length; i++) {
            set.add(socials2[i].key)
          }
          for (i = 0; i < socials3.length; i++) {
            set.add(socials3[i].key)
          }
          var s = [];
          for (i = 0; i < set.size; i++) {
            s[i] = { key: [...set][i] };
          }
          return { result: "ok", message: { total: response.body.hits.total.value, hits: response.body.hits.hits, promotion: response.body.aggregations.by_promotion.buckets, social: s }}
        },
        err => {
          return { result: "error", message: err.message}
        }
      );

}

/**
 * Método que devuelve el cuerpo de la consulta a ElasticSearch
 * @function getBody
 * @param {String} query Consulta del usuario
 * @param {String} promotions Filtro de promoción seleccionado por el usuario
 * @param {String} socials Filtro de redes sociales seleccionado por el usuario
 * @param {String} sort Ordenación seleccionada por el usuario
 * @returns El body generado
 */
function getBody(query, promotions, socials, sort) {
  var fixedSort = sort == "" ? "desc" : sort;
  let body = {
    "size": 1000,
    "query":
      getBool(query, promotions, socials),
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
              "_key": fixedSort
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

/**
 * Método que devuelve la consulta booleana que se le debe hacer a ElasticSearch.
 * @function getBool
 * @param {String} query Consulta del usuario
 * @param {String} promotions Filtro de promoción seleccionado por el usuario
 * @param {String} socials Filtro de redes sociales seleccionado por el usuario
 * @returns El body generado
 */
function getBool(query, promotions, socials) {
  let filterQuery = getFilter(promotions, socials);
  if (filterQuery != null) {
    return { "bool": { "must": [getQuery(query)], "filter": filterQuery } }
  }
  return { "bool": { "must": [getQuery(query)] } }
}

/**
 * Método interno para comprobar si un filtro no tiene valor
 * @function isEmptyFilter
 * @param {String} filter Filtro a comprobar
 * @returns True si es vacío, false si no
 */
function isEmptyFilter(filter) {
  if (filter != undefined && filter != null && filter != "") {
    return false;
  }
  return true;
}

/**
 * Método que devuelve la consulta de filtros a ElasticSearch.
 * @function getFilter
 * @param {String} promotions Filtro de promoción seleccionado por el usuario
 * @param {String} socials Filtro de redes sociales seleccionado por el usuario
 * @returns El body generado
 */
function getFilter(promotions, socials) {
  if (isEmptyFilter(promotions) && isEmptyFilter(socials)) {
    return null;
  }
  var filterPromotions = "";
  var filterSocials = "";
  if (!isEmptyFilter(promotions)) {
    var promFilter = getPromotionsFilter(promotions);
    if (promFilter != "") {
      filterPromotions = '"must": [ ' + promFilter + ' ]'
    }
  }

  if (!isEmptyFilter(socials)) {
    var socFilter = getSocialsFilter(socials);
    if (socFilter != "") {
      filterSocials = '"should": [ ' + socFilter + ' ]'
    }
  }
  if (filterPromotions != "" && filterSocials != "") {
    filterPromotions += ',';
  }
  let filterQuery = "";
  if (filterSocials != "") {
    filterQuery = '{"bool": {"minimum_should_match": "1",' + filterPromotions + filterSocials + '}}';
  }
  else {
    filterQuery = '{"bool": {' + filterPromotions + filterSocials + '}}';
  }


  return JSON.parse(filterQuery);

}

/**
 * Método que devuelve el cuerpo de la consulta del filtro de promociones.
 * @function getPromotionsFilter
 * @param {String} values Lista de valores seleccionados
 * @returns el body generado
 */
function getPromotionsFilter(values) {
  let array = values.split(",");
  let filterQuery = "";
  for (let i = 0; i < array.length; i++) {
    filterQuery = filterQuery + JSON.stringify({ "term": { promotion: array[i] } });
    if (i != array.length - 1) {
      filterQuery = filterQuery + ",";
    }
  }
  return filterQuery;
}

/**
 * Método que devuelve el cuerpo de la consulta del filtro de redes sociales.
 * @function getSocialsFilter
 * @param {String} values Lista de valores seleccionados
 * @returns el body generado
 */
function getSocialsFilter(values) {
  let array = values.split(",");
  let filterQuery = "";
  for (let i = 0; i < array.length; i++) {
    filterQuery = filterQuery + JSON.stringify({ "term": { Red1: array[i] } }) + ",";
    filterQuery = filterQuery + JSON.stringify({ "term": { Red2: array[i] } }) + ",";
    filterQuery = filterQuery + JSON.stringify({ "term": { Red3: array[i] } });
    if (i != array.length - 1) {
      filterQuery = filterQuery + ",";
    }
  }
  return filterQuery;
}

/**
 * Método que devuelve el cuerpo de la consulta escrita por el usuario para ElasticSearch
 * @function getQuery
 * @param {String} query Consulta del usuario
 * @returns El body generado
 */
function getQuery(query) {
  if (query == undefined || query == "" || query.replace(" ", "") == "") {
    return { "match_all": {} };
  }
  return {
    "multi_match": {
      "query": query,
      "type": "bool_prefix",
      "fields": [
        "name^2",
        "shortDescription^1",
        "longDescription^1",
        "professionalAchievements^1",
        "promotion^1",
        "Red1^0.5",
        "Red2^0.5",
        "Red3^0.5"
      ],
      "tie_breaker": 1.00
    }
  }
}