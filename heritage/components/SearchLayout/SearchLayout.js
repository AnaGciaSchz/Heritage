import styles from './searchLayout.module.scss'
import Result from "components/Result/Result.js"
import MultiSelectFilter from "components/MultiSelectFilter/MultiSelectFilter.js"

export default function SearchLayout(props) {
    return (
        <section className={styles.layout}>
             <MultiSelectFilter className={styles.layoutFilter}
              promotions = {props.promotions}
              /> 
            <Result className={styles.layoutResult}
            query= {props.query}
            filter= {props.filter}
            index={props.index}
            change = {props.change}
            setPromotions = {props.setPromotions}
            /> 
            </section>    
    )
}

