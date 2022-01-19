import styles from './searchLayout.module.scss'
import React, { useState, useEffect } from 'react';
import Result from "components/Result/Result.js"
import MultiSelectFilter from "components/MultiSelectFilter/MultiSelectFilter.js"
import { useIntl } from "react-intl"

import {useDispatch,useSelector,} from 'react-redux';

import {
  changeByUserPromotions,
  selectPromotionsSlice
} from '../../../services/redux/features/promotions/promotionsSlice.js';

import {
  changeByUserSocials,
  selectSocialsSlice
} from '../../../services/redux/features/socials/socialsSlice.js';

export default function SearchLayout(props) {
  const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    const [promotions, setPromotions] = useState(null);
    const [promotionsChange, setPromotionsChange] = useState(false);
    const [promotionsFilter, setPromotionsFilter] =  useState("");
    const p = useSelector(selectPromotionsSlice);

    const [socials, setSocials] = useState(null);
    const [socialsChange, setSocialsChange] = useState(false);
    const [socialsFilter, setSocialsFilter] =  useState("");
    const s = useSelector(selectSocialsSlice);


    const dispatch = useDispatch() 

    return (
        <section className={styles.layout}>
          <section className={styles.layoutFilter}>
            <h2 className="title2">{f("Filtros")}</h2>
             <MultiSelectFilter className={styles.expandable}
              name={f("Promocion")}
              content = {promotions}
              contentChangeBecauseOfSearch = {promotionsChange}
              setFilterWithUserValues = {setPromotionsFilter}
              setContentChangeBecauseOfUser ={() => dispatch(changeByUserPromotions())}
              /> 
              <MultiSelectFilter className={styles.expandable}
              name={f("RedesSociales")}
              content = {socials}
              contentChangeBecauseOfSearch = {socialsChange}
              setFilterWithUserValues = {setSocialsFilter}
              setContentChangeBecauseOfUser = {() => dispatch(changeByUserSocials())}
              /> 
              </section>
            <Result className={styles.layoutResult}
            query= {props.query}
            promotionsFilter= {promotionsFilter}
            socialsFilter= {socialsFilter}
            index={props.index}
            change = {props.change}
            setPromotions = {setPromotions}
            promotionsChange = {promotionsChange}
            setPromotionsChange = {setPromotionsChange}
            changePromotionsFilter = {p}
            setSocials = {setSocials}
            socialsChange = {socialsChange}
            setSocialsChange = {setSocialsChange}
            changeSocialsFilter = {s}
            /> 
            </section>    
    )
}

