import React from 'react';
import styles from './internacionalizationOption.module.scss'

export default function InternacionalizationOption(props) {
    const selected = (props.selected);
    return (<a className={styles.option} onClick={props.language}>{selected?<b>{props.option}</b>:props.option}</a>);
}