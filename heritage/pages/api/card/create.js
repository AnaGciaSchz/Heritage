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
        await esClient.indices.create({
            index: "student-card",
            body: mapping
        }).then(
            () => {
                console.log({ result: "ok", message: "Elastic search index created.", status: 200 });
            },
            err => {
                console.log({ result: "error", message: err.message + " on elastic search", status: 500 });
            }
        );
    }
}

const mapping = {
    "mappings": {
        "properties": {
            "name": {
                "type": "text",
                "search_analyzer": "student_search_analyzer",
                "analyzer": "student_analyzer",
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
            "shortDescription": {
                "type": "text",
                "search_analyzer": "student_search_analyzer",
                "analyzer": "student_analyzer"
            },
            "longDescription": {
                "type": "text",
                "search_analyzer": "student_search_analyzer",
                "analyzer": "student_analyzer"
            },
            "professionalArchievements": {
                "type": "text",
                "search_analyzer": "student_search_analyzer",
                "analyzer": "student_analyzer"
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
                "student_search_analyzer": {
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
                "student_analyzer": {
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