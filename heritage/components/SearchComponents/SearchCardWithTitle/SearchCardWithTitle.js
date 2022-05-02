

import styles from './searchCardWithTitle.module.scss'
import SearchCard from "components/SearchComponents/SearchCard/SearchCard.js"


export default function SearchCardWithTitle(props) {
    return (
        <div>
            <h3 className={styles.title}>{props.title}</h3>
            <SearchCard key = {props.key}
          name= {props.last.hits[0]._source.name}
          img={props.last.hits[0]._source.image}
          firtsLine={props.last.hits[0]._source.promotion}
          text={props.last.hits[0]._source.shortDescription}
          date={props.last.hits[0]._source.registry}
          description={props.last.hits[0]._source.longDescription}
          been={props.last.hits[0]._source.professionalArchievements}
          red1={props.last.hits[0]._source.Red1}
          red1Link={props.last.hits[0]._source.Red1Link}
          red2={props.last.hits[0]._source.Red2}
          red2Link={props.last.hits[0]._source.Red2Link}
          red3={props.last.hits[0]._source.Red3}
          red3Link={props.last.hits[0]._source.Red3Link}
          star={props.last.hits[0]._source.AppearsInAnotherCategory}
      />

        </div>
    )
}