import styles from './sort.module.scss';
import { useIntl } from "react-intl";
import React, { useState } from 'react';

export default function Sort(props) {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
  const [ascSort, setAscSort] = useState(true);
  const [descSort, setDescSort] = useState(false);

  const selectButton = (value) => {
    if(value!=null && value !=undefined && (value=="desc" || value=="asc")){
      setAscSort(false);
      setDescSort(false);
      if(value=="asc"){
        setAscSort(true);
        props.setSort("asc");
        props.change();
      }else{
        setDescSort(true);
        props.setSort("desc");
        props.change();
      }
  }
}
    return (
        <>
        <div className={styles.dropdown}>
  <input type="checkbox" id="dropdown"/>

  <label className={styles.dropdown__face} for="dropdown">
    <div className={styles.dropdown__text}>{f("Ordenar")}</div>

    <div className={styles.dropdown__arrow}></div>
  </label>

  <ul className={styles.dropdown__items}>
    <button className={ascSort? styles.buttonSelected : styles.button} onClick={() =>selectButton("asc")}>↑ {f("Promocion")}</button>
    <button className={descSort? styles.buttonSelected : styles.button} onClick={() => selectButton("desc")}>↓ {f("Promocion")}</button>
  </ul>
</div>

<svg className={styles.svg}>
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
    <feBlend in="SourceGraphic" in2="goo" />
  </filter>
</svg>
</>
    )
}