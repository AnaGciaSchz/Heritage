import SearchBar from "components/SearchBar/SearchBar.js"
import Result from "components/Result/Result.js"
import { useState } from "react";
import { useIntl } from "react-intl"

export default function ZonaEgresados() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    const [query, setQuery] = useState("");
    const [change, setChange] = useState(false);
    const [promotions, setPromotions] = useState(null);
    var dataMap = new Map();
    dataMap.set("promotion", "2021-2022");
    return (
        <div>
            <h1 className="title1">{f("ZExalumnado")}</h1>
            <SearchBar
            setQuery = {setQuery}
            setChange={setChange}
            promotions = {promotions}
            />    
            <Result
            query= {query}
            filter= {null}
            index="student-card"
            change = {change}
            setPromotions = {setPromotions}
            />                         
        </div>
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