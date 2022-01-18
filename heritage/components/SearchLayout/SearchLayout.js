import styles from './searchLayout.module.scss'
import React, { useState, useEffect } from 'react';
import Result from "components/Result/Result.js"
import MultiSelectFilter from "components/MultiSelectFilter/MultiSelectFilter.js"

export default function SearchLayout(props) {
    const [promotions, setPromotions] = useState(null);
    const [promotionsChange, setPromotionsChange] = useState(false);
    const [promotionsFilter, setPromotionsFilter] =  useState("");
    const [changePromotionsFilter, setChangePromotionsFilter] = useState(false);

    const filtersMap = new Map();

    function updateFilters() {
        filtersMap.set("promotion", promotionsFilter);
      }
    useEffect(() => {
        updateFilters();
      }, [changePromotionsFilter]);
    return (
        <section className={styles.layout}>
             <MultiSelectFilter className={styles.layoutFilter}
              promotions = {promotions}
              promotionsChange = {promotionsChange}
              setPromotionsFilter = {setPromotionsFilter}
              setChangePromotionsFilter = {setChangePromotionsFilter}
              changePromotionsFilter = {changePromotionsFilter}
              /> 
            <Result className={styles.layoutResult}
            query= {props.query}
            promotionsFilter= {promotionsFilter}
            index={props.index}
            change = {props.change}
            setPromotions = {setPromotions}
            promotionsChange = {promotionsChange}
            setPromotionsChange = {setPromotionsChange}
            changePromotionsFilter = {changePromotionsFilter}
            /> 
            </section>    
    )
}

