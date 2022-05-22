import React, { useState, useEffect } from 'react';
import styles from './multiselectFilter.module.scss'

export default function MultiSelectFilter(props) {
  const [content, setContent] = useState(null);
  const [lastFilter, setLastFilter] = useState("");

  const showFilter = async () => {
    if (props.content != null) {
      var inputsAndLabels = new Array();
      var i;
      for (i = 0; i < props.content.length; i++) {
        if (lastFilter !== "" && lastFilter.split(",").includes(props.content[i].key)) {
          inputsAndLabels[i] = <div key={i}><input  id={props.name.replace(" ","") + i} type="checkbox" value={props.content[i].key} checked /> <label htmlFor={i}>{props.content[i].key}</label></div>;
        } else {
          inputsAndLabels[i] = <div key={i}><input  id={props.name.replace(" ","") + i} type="checkbox" value={props.content[i].key} /> <label htmlFor={i}>{props.content[i].key}</label></div>;
        }

      }
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
        element = document.querySelector("#" + props.name.replace(" ","") + i);
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
  return (<details onClick={sendChangesByUser} open>
    <summary className={styles.s}>{props.name}</summary>
    <div id={styles.checklist}>
      {content != null ?
        content
        : null}</div>
  </details>);
}

