import styles from './searchLayout.module.scss'
import React, { useState } from 'react';
import Result from "components/Result/Result.js"
import MultiSelectFilter from "../../MultiselectFilter/MultiSelectFilter"
import { useIntl } from "react-intl"

import { useDispatch, } from 'react-redux';

import { changeByUserPromotions } from '../../../services/redux/features/promotions/promotionsSlice.js';

import { changeByUserSocials } from '../../../services/redux/features/socials/socialsSlice.js';

export default function SearchLayout(props) {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const [promotions, setPromotions] = useState(null);
  const [promotionsChange, setPromotionsChange] = useState(false);
  const [promotionsFilter, setPromotionsFilter] = useState("");

  const [socials, setSocials] = useState(null);
  const [socialsChange, setSocialsChange] = useState(false);
  const [socialsFilter, setSocialsFilter] = useState("");


  const dispatch = useDispatch()

  return (
    <section className={styles.layout}>
      <section className={styles.layoutFilter}>
        <h2 className={styles.titleSideFirst}>{f("Filtros")}</h2>
        <MultiSelectFilter className={styles.expandable}
          name={f("Promocion")}
          content={promotions}
          contentChangeBecauseOfSearch={promotionsChange}
          setFilterWithUserValues={setPromotionsFilter}
          setContentChangeBecauseOfUser={() => dispatch(changeByUserPromotions())}
        />
        <MultiSelectFilter className={styles.expandable}
          name={f("RedesSociales")}
          content={socials}
          contentChangeBecauseOfSearch={socialsChange}
          setFilterWithUserValues={setSocialsFilter}
          setContentChangeBecauseOfUser={() => dispatch(changeByUserSocials())}
        />

      </section>
      <Result className={styles.layoutResult}
        query={props.query}
        index={props.index}
        sort={props.sort}
        promotionsFilter={promotionsFilter}
        socialsFilter={socialsFilter}
        setPromotions={setPromotions}
        promotionsChange={promotionsChange}
        setPromotionsChange={setPromotionsChange}
        setSocials={setSocials}
        socialsChange={socialsChange}
        setSocialsChange={setSocialsChange}
      />
    </section>
  )
}

