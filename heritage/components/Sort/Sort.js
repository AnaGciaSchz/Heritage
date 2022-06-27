import styles from './sort.module.scss';
import { useIntl } from "react-intl";
import React, { useState } from 'react';

export default function Sort(props) {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  const [ascSort, setAscSort] = useState(true);
  const [descSort, setDescSort] = useState(false);

  const selectButton = (value) => {
    if (value != null && value != undefined && (value == "desc" || value == "asc")) {
      setAscSort(false);
      setDescSort(false);
      if (value == "asc") {
        setAscSort(true);
        props.setSort("asc");
        props.change();
      } else {
        setDescSort(true);
        props.setSort("desc");
        props.change();
      }
    }
  }
  return (
    <>
      <div className={styles.dropdown}>
      <input type="checkbox" id="dropdown" />

        <label className={styles.dropdown__face} htmlFor="dropdown">
          <span className={styles.dropdown__text} tabIndex='0'>{f("Ordenar")}</span>

          <span className={styles.dropdown__arrow}></span>
        </label>

        <div  className={styles.dropdown__items}>
          <button className={ascSort ? styles.buttonSelected : styles.button} tabIndex='0' onClick={() => selectButton("asc")}>↑ {f("Promocion")}</button>
          <button className={descSort ? styles.buttonSelected : styles.button} tabIndex='0' onClick={() => selectButton("desc")}>↓ {f("Promocion")}</button>
        </div>
      </div>

      <svg>
        <filter  id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </>
  )
}