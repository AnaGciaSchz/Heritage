import React, { useState, useEffect } from 'react';
import { useIntl } from "react-intl"
import styles from './multiselectFilter.module.scss'


export default function MultiSelectFilter(props) {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })
    const [promotions, setPromotions] = useState(null);

    const showPromotions = async () => {
      if(props.promotions!=null){
      var p = new Array();
      var i;
      for(i=0;i<props.promotions.length;i++){
        p[i]= <><input id={i} type="checkbox" value={props.promotions[i].key} /> <label for={i}>{props.promotions[i].key}</label></>;
        }
      setPromotions(p);
    }
  }

  useEffect(() => {
    showPromotions();
  }, [props.change]);
return (<details className={styles.expandable}>
  <summary className={styles.s}>{f("Promocion")}</summary>
  <div id={styles.checklist}>
{promotions!=null ?
      promotions
      : null}</div>
      </details>);
}

