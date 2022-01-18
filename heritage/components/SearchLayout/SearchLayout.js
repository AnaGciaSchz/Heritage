import styles from './searchLayout.module.scss'
import { useState } from "react";
import Result from "components/Result/Result.js"
import MultiSelectFilter from "components/MultiSelectFilter/MultiSelectFilter.js"

export default function SearchLayout(props) {
    const [promotions, setPromotions] = useState(null);
    return (
        <section className={styles.layout}>
             <MultiSelectFilter className={styles.layoutFilter}
              promotions = {promotions}
              change = {props.change}
              /> 
            <Result className={styles.layoutResult}
            query= {props.query}
            filter= {props.filter}
            index={props.index}
            change = {props.change}
            setPromotions = {setPromotions}
            /> 
            </section>    
    )
}

