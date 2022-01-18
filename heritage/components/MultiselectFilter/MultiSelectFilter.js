import React, { useState, useEffect } from 'react';
import { useIntl } from "react-intl"
import styles from './multiselectFilter.module.scss'


export default function MultiSelectFilter(props) {

    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })
    const [promotions, setPromotions] = useState(null);
    const [lastFilter, setLastFilter] = useState("");

    const showPromotions = async () => {
      if(props.promotions!=null){
      var p = new Array();
      var i;
      for(i=0;i<props.promotions.length;i++){
        if(lastFilter !== "" && lastFilter.split(",").includes(props.promotions[i].key)){
          p[i]= <><input id={"promotion"+i} type="checkbox" value={props.promotions[i].key} checked/> <label htmlFor={i}>{props.promotions[i].key}</label></>;
        }else{
          p[i]= <><input id={"promotion"+i} type="checkbox" value={props.promotions[i].key}/> <label htmlFor={i}>{props.promotions[i].key}</label></>;
        }
        
        }
      setPromotions(null);
      setPromotions(p);
    }
  }

  const sendPromotions = async () => {
    var filter = "";
    var element;
    var i;
    for(i=0;i<promotions.length;i++){
      element = document.querySelector("#promotion"+i);
      element.checked ? filter+=element.value+"," : filter+="";
    }
    if(filter !==""){
    filter=filter.slice(0,-1);
    }
    if(filter != lastFilter){
      setLastFilter(filter);
      props.setPromotionsFilter(filter);
      props.setChangePromotionsFilter(!props.changePromotionsFilter)

    }
    
  }

  useEffect(() => {
    showPromotions();
  }, [props.promotionsChange]);
return (<details onClick = {sendPromotions} className={styles.expandable}>
  <summary className={styles.s}>{f("Promocion")}</summary>
  <div id={styles.checklist}>
{promotions!=null ?
      promotions
      : null}</div>
      </details>);
}

