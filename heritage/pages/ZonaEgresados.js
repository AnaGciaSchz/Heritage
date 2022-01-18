import SearchBar from "components/SearchBar/SearchBar.js"
import { useState } from "react";
import { useIntl } from "react-intl"
import SearchLayout from "../components/SearchLayout/SearchLayout";

export default function ZonaEgresados() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    const [query, setQuery] = useState("");
    const [change, setChange] = useState(false);

    return (
        <>
            <h1 className="title1">{f("ZExalumnado")}</h1>
            <SearchBar
            setQuery = {setQuery}
            setChange={setChange}
            />   
            <SearchLayout
            query= {query}
            index="student-card"
            change = {change}
            />                    
        </>
    );

}

            /**{JSON.stringify(Array.from(dataMap.entries()))}*/




            /**
             * {
  "size": "10000",
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "Ana",
            "type": "bool_prefix",
            "fields": [
              "name^5"
            ],
            "tie_breaker": 0.01
          }
        }
      ],
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "promotion": "2021-2022"
              }
            }
          ]
        }
      }
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