import React, { useState, useEffect } from 'react';
import SearchCard from "components/SearchComponents/SearchCard/SearchCard.js"
import styles from './result.module.scss'
import NoResult from '../NoResult/NoResult';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';

import { useSelector, } from 'react-redux';
import { selectPromotionsUserSlice } from '../../services/redux/features/promotions/promotionsSlice.js';
import { selectSocialsSlice } from '../../services/redux/features/socials/socialsSlice.js';
import { selectSearchUserSlice } from '../../services/redux/features/search/searchSlice.js';

import { fetchWrapper } from '../../pages/api/handlers/fetchWrapper';

import getConfig from 'next/config';



export default function Result(props) {
  const [results, setResults] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [changePaginationBcResults, setChangePaginationBcResults] = useState(false);
  const [changeResultsBcPagination, setChangeResultsBcPagination] = useState(false);
  const [from, setFrom] = useState(0)
  const [actualPage, setActualPage] = useState(1)

  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}`;


  const search = async (event) => {
    var dataMap = new Map();
    dataMap.set("query", props.query);
    dataMap.set("promotions", props.promotionsFilter);
    dataMap.set("socials", props.socialsFilter);
    dataMap.set("index", props.index);
    dataMap.set("sort", props.sort);
    dataMap.set("from", from);
    const response = await fetchWrapper.post(`${baseUrl}/card/search`, Array.from(dataMap.entries()));
    return await response.json();
  }

  const createResults = async () => {
    setResults(<Loading />)
    var result = await search();
    var results = new Array();
    var i;
    setTotalHits(result.total)
    setChangePaginationBcResults(!changePaginationBcResults);
    setFrom(0)
    setActualPage(1)
    if (result && result.hits) {
      for (i = 0; i < result.hits.length; i++) {
        results[i] = <SearchCard key={i}
          id={result.hits[i]._id}
          index={result.hits[i]._index}
          name={result.hits[i]._source.name}
          img={result.hits[i]._source.image}
          firtsLine={result.hits[i]._source.promotion}
          text={result.hits[i]._source.shortDescription}
          date={result.hits[i]._source.registry}
          description={result.hits[i]._source.longDescription}
          been={result.hits[i]._source.professionalAchievements}
          red1={result.hits[i]._source.Red1}
          red1Link={result.hits[i]._source.Red1Link}
          red2={result.hits[i]._source.Red2}
          red2Link={result.hits[i]._source.Red2Link}
          red3={result.hits[i]._source.Red3}
          red3Link={result.hits[i]._source.Red3Link}
          star={result.hits[i]._source.AppearsInAnotherCategory}
        />

      }
      props.setSocials(result.social);
      props.setSocialsChange(!props.socialsChange)

      props.setPromotions(result.promotion);
      props.setPromotionsChange(!props.promotionsChange)
    }

    showResults(results)

  }

  function showResults(results) {
    if (results.length == 0) {
      setResults(<NoResult />);
    } else {
      setResults(results);
    }
  }

  useEffect(() => {
    createResults();
  }, [useSelector(selectSearchUserSlice), useSelector(selectPromotionsUserSlice), useSelector(selectSocialsSlice), changeResultsBcPagination]);
  return (<><section className={styles.layout}>
    {results}</section>    
    <div className={styles.pagination}><Pagination
      totalHits={totalHits}
      changeBcResults = {changePaginationBcResults}
      changeResultsBcPagination = {setChangeResultsBcPagination}
      from={setFrom}
      actualPage = {actualPage}
      setActualPage = {setActualPage}
    /></div></>);
}