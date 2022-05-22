import React, { useState, useEffect } from 'react';
import SearchResult from "components/SearchComponents/SearchResult/SearchResult.js"
import styles from './result.module.scss'
import NoResult from '../NoResult/NoResult';

import {useSelector,} from 'react-redux';
import {selectPromotionsUserSlice} from '../../services/redux/features/promotions/promotionsSlice.js';
import {selectSocialsSlice} from '../../services/redux/features/socials/socialsSlice.js';
import {selectSearchUserSlice} from '../../services/redux/features/search/searchSlice.js';

import { fetchWrapper } from '../../pages/api/handlers/fetchWrapper';

export default function Result(props) {
    const [results, setResults] = useState(null);

    const search = async (event) => {
    var dataMap = new Map();
    dataMap.set("query", props.query);
    dataMap.set("promotions", props.promotionsFilter);
    dataMap.set("socials", props.socialsFilter);
    dataMap.set("index", props.index);
    dataMap.set("sort",props.sort)
    const response = await fetchWrapper.post("http://localhost:3000/api/card/search",Array.from(dataMap.entries()));
      var r = await response.json();
      return r.message;
    }

    const createResults = async () => {
        var result = await search();
        var results = new Array();
        var i;
        for(i=0;i<result.promotion.length;i++){
            results[i]= <SearchResult key={i}
            promotion = {result.promotion[i].key}
            values = {result.promotion[i].by_top_hit.hits.hits}
            />
        }
        props.setSocials(result.social);
        props.setSocialsChange(!props.socialsChange)

        props.setPromotions(result.promotion);
        props.setPromotionsChange(!props.promotionsChange)

        setResults(null);
        if(results.length==0){
          setResults(<NoResult/>);
        }else{
        setResults(results);}
    }
    
    useEffect(() => {
        createResults();
      }, [useSelector(selectSearchUserSlice), useSelector(selectPromotionsUserSlice), useSelector(selectSocialsSlice)]);
    return (<section className={styles.layout}>
    {results!=null ?
          results
          : null}</section>);
  }