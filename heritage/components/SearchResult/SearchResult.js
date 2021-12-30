import styles from './searchResult.module.scss'
import SearchCard from "components/SearchCard/SearchCard.js"
import React, { useState, useEffect } from 'react';

export default function SearchResult(props) {
    const [results, setResults] = useState(null);

    const createResults = async () => {
        var data = props.values;
        var r = new Array();
        var i;

        for(i=0;i<data.length;i++){
            console.log(data)
            r[i]= <SearchCard
            name= {data[i]._source.name}
            img={data[i]._source.image}
            alt="Imagen"
            firtsLine={"Promoción "+data[i]._source.promotion}
            text={data[i]._source.shortDescription}
            date="20/09/2021"
            descriptionTitle="Descripción"
            description={data[i]._source.longDescription}
            beenTitle="Logros profesionales más importantes:"
            been={data[i]._source.professionalArchievements}
            red1={data[i]._source.Red1}
            red1Link={data[i]._source.Red1Link}
            red2={data[i]._source.Red2}
            red2Link={data[i]._source.Red2Link}
            red3={data[i]._source.Red3}
            red3Link={data[i]._source.Red3Link}
            star={data[i]._source.AppearsInAnotherCategory}
        />
        }
        setResults(r);
    }

    useEffect(() => {
        createResults();
      }, []);
    return (
        <div>
            <h2 className={styles.title2Search}>{props.promotion}</h2>
        <div className={styles.searchFeed}>
        {results}
            </div>
        </div>
    )
}