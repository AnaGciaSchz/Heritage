import styles from './searchResult.module.scss'
import SearchCard from "components/SearchComponents/SearchCard/SearchCard.js"
import React, { useState, useEffect } from 'react';
import { useIntl } from "react-intl"

export default function SearchResult(props) {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    const [results, setResults] = useState(null);

    const createResults = async () => {
        var data = props.values;
        if(data != null){
        var r = new Array();
        var i;

        for(i=0;i<data.length;i++){
            r[i]= <SearchCard key = {i}
            id= {data[i]._id}
            index = {data[i]._index}
            name= {data[i]._source.name}
            img={data[i]._source.image}
            firtsLine={data[i]._source.promotion}
            text={data[i]._source.shortDescription}
            date={data[i]._source.registry}
            description={data[i]._source.longDescription}
            been={data[i]._source.professionalArchievements}
            red1={data[i]._source.Red1}
            red1Link={data[i]._source.Red1Link}
            red2={data[i]._source.Red2}
            red2Link={data[i]._source.Red2Link}
            red3={data[i]._source.Red3}
            red3Link={data[i]._source.Red3Link}
            star={data[i]._source.AppearsInAnotherCategory}
        />
        setResults(r);
    }
    }
}

    useEffect(() => {
        createResults();
      }, []);
    return (
        <>
            <h2 className={styles.title2Search}>{f("Promocion")+" "+props.promotion}</h2>
        <div className={styles.searchFeed}>
        {results}
            </div>
        </>
    )
}