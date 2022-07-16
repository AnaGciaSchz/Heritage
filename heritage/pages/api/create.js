var esClient = null;
const logger = require('pino')()
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
        await esClient.indices.create({
            index: "student-card",
            body: mapping
        }).then(
            () => {
                logger.info("Se ha creado el indice: student-card en elasticsearch.")
            },
            err => {
                logger.error("No se ha podido crear el indice: student-card en elasticsearch.")
                logger.error(err.message)
                res.status(500).json({ result: "error", message: err.message + " on elastic search" });
            }
        );
        await esClient.indices.create({
            index: "professor-card",
            body: mapping
        }).then(
            () => {
                logger.info("Se ha creado el indice: professor-card en elasticsearch.")
            },
            err => {
                logger.error("No se ha podido crear el indice: professor-card en elasticsearch.")
                logger.error(err.message)
                res.status(500).json({ result: "error", message: err.message + " on elastic search" });
            }
        );
        await esClient.indices.create({
            index: "delegate-card",
            body: mapping
        }).then(
            () => {
                logger.info("Se ha creado el índice: delegate-card en elasticsearch.")
            },
            err => {
                logger.error("No se ha podido crear el indice: delegate-card en elasticsearch.")
                logger.error(err.message)
                res.status(500).json({ result: "error", message: err.message + " on elastic search" });
            }
        );
        logger.info("Se han creado todos los indices en elasticsearch.")
        res.status(200).json({ result: "ok", message: "Index created" });
    } else {
        logger.error("Error: No se puede conectar con el indice de elastic, revisa que esta funcionando.")
        res.status(500).json({ result: "error", message: "No elasticsearch client" });
    }
}

const mapping = {
    "mappings": {
        "properties": {
            "name": {
                "type": "text",
                "search_analyzer": "card_search_analyzer",
                "analyzer": "card_analyzer",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "normalizer": "standard_normalizer"
                    }
                }
            },
            "promotion": {
                "type": "keyword"
            },
            "registry": {
                "type": "text"
            },
            "timestamp": {
                "type": "date",
                "format":"epoch_millis"
            },
            "shortDescription": {
                "type": "text",
                "search_analyzer": "card_search_analyzer",
                "analyzer": "card_analyzer"
            },
            "longDescription": {
                "type": "text",
                "search_analyzer": "card_search_analyzer",
                "analyzer": "card_analyzer"
            },
            "professionalAchievements": {
                "type": "text",
                "search_analyzer": "card_search_analyzer",
                "analyzer": "card_analyzer"
            },
            "image": {
                "type": "text"
            },
            "Red1": {
                "type": "keyword",
                "normalizer": "standard_normalizer"
            },
            "Red2": {
                "type": "keyword",
                "normalizer": "standard_normalizer"
            },
            "Red3": {
                "type": "keyword",
                "normalizer": "standard_normalizer"
            },
            "Red1Link": {
                "type": "text"
            },
            "Red2Link": {
                "type": "text"
            },
            "Red3Link": {
                "type": "text"
            },
            "AppearsInAnotherCategory": {
                "type": "boolean"
            }
        }
    },
    "settings": {
        "analysis": {
            "normalizer": {
                "standard_normalizer": {
                    "type": "custom",
                    "char_filter": [],
                    "filter": [
                        "lowercase",
                        "asciifolding"
                    ]
                }
            },
            "analyzer": {
                "card_search_analyzer": {
                    "type": "custom",
                    "tokenizer": "whitespace",
                    "char_filter": [
                        "my_char_filter"
                    ],
                    "filter": [
                        "lowercase",
                        "asciifolding",
                        "my_custom_word_delimiter_graph_filter"
                    ]
                },
                "card_analyzer": {
                    "type": "custom",
                    "tokenizer": "whitespace",
                    "char_filter": [
                        "my_char_filter"
                    ],
                    "filter": [
                        "lowercase",
                        "asciifolding",
                        "keyword_repeat",
                        "my_custom_word_delimiter_graph_filter"
                    ]
                }
            },
            "filter": {
                "my_custom_word_delimiter_graph_filter": {
                    "type": "word_delimiter_graph",
                    "catenate_words": true,
                    "stem_english_possessive": true
                }
            },
            "char_filter": {
                "my_char_filter": {
                    "type": "mapping",
                    "mappings": [
                        ", => ",
                        ". => ",
                        "_ => ",
                        ": => ",
                        "¿ => ",
                        "? => ",
                        "¡ => ",
                        "! => "
                    ]
                }
            }
        }
    }
}