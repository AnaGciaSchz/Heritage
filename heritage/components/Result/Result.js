import { useState } from "react";
import SearchResult from "components/SearchResult/SearchResult.js"

export default function Result(props) {
    const [results, setResults] = useState(null);

    const search = async (event) => {
    var dataMap = new Map();
    dataMap.set("query", props.query);
    dataMap.set("index", props.index);
    const response = await fetch("http://localhost:3000/api/card/search", {
        method: "POST",
        body: JSON.stringify(Array.from(dataMap.entries()))
      });
      var r = await response.json();
      return r.message;
    }

    const createResults = async (event) => {
        var result = await search();
        var results = new Array();
        var i;
        for(i=0;i<result.aggregation.length;i++){
            results[i]= <SearchResult
            promotion = {"Promoción "+result.aggregation[i].key}
            values = {result.aggregation[i].by_top_hit.hits.hits}
            />
        }
        setResults(results);
    }
    return (<><button onClick={createResults}>Click</button>
    {results!=null ?
          results
          : null}</>);
  }