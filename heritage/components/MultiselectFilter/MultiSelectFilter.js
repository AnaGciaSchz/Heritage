import React, { useState, useEffect } from 'react';
import styles from './multiselectFilter.module.scss'

export default function MultiSelectFilter(props) {
  const [content, setContent] = useState(null);
  const [lastFilter, setLastFilter] = useState("");

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const showFilter = async () => {
    if (props.content != null) {
      var inputsAndLabels = new Array();
      var i;
      for (i = 0; i < props.content.length; i++) {
        if (lastFilter !== "" && lastFilter.split(",").includes(props.content[i].key)) {
          inputsAndLabels[i] = <div key={i}><input className={styles.input} id={props.name.replace(" ", "") + i} type="checkbox" value={props.content[i].key} defaultChecked /> <label className={styles.label} htmlFor={i}>{props.content[i].key}</label></div>;
        } else {
          inputsAndLabels[i] = <div key={i}><input className={styles.input} id={props.name.replace(" ", "") + i} type="checkbox" value={props.content[i].key} /> <label className={styles.label} htmlFor={i}>{props.content[i].key}</label></div>;
        }

      }
      await sleep(50);
      setContent(null);
      setContent(inputsAndLabels);
    }
  }

  const sendChangesByUser = async () => {
    if (content != null) {
      var filter = "";
      var element;
      var i;
      for (i = 0; i < content.length; i++) {
        element = document.querySelector("#" + props.name.replace(" ", "") + i);
        element.checked ? filter += element.value + "," : filter += "";
      }
      if (filter !== "") {
        filter = filter.slice(0, -1);
      }
      if (filter != lastFilter) {
        setLastFilter(filter);
        props.setFilterWithUserValues(filter);
        props.setContentChangeBecauseOfUser();

      }
    }

  }
  useEffect(() => {
    showFilter();
  }, [props.contentChangeBecauseOfSearch]);
  return (<><details onClick={() =>{sendChangesByUser();}} open>
    <summary className={styles.s}>{props.name}</summary>
    <div className={styles.selector}>
      {content}</div>
  </details></>);
}

