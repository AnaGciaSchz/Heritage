

import styles from './searchCardWithTitle.module.scss'
import SearchCard from "components/SearchComponents/SearchCard/SearchCard.js"
import { useIntl } from "react-intl"
import getConfig from 'next/config';


export default function SearchCardWithTitle(props) {

    const { formatMessage } = useIntl()
    const f = id => formatMessage({ id })

    const { publicRuntimeConfig } = getConfig();
    const resourceUrl = `${publicRuntimeConfig.resourceUrl}`;
    return (
        <article className={styles.card}>
            <h3 className={styles.title}>{f(props.title)}</h3>
            {props.last && props.last.hits && props.last.hits[0] ?
                <SearchCard
                    id={props.last.hits[0]._id}
                    index={props.last.hits[0]._index}
                    name={props.last.hits[0]._source.name}
                    img={props.last.hits[0]._source.image}
                    firtsLine={props.last.hits[0]._source.promotion}
                    text={props.last.hits[0]._source.shortDescription}
                    date={props.last.hits[0]._source.registry}
                    description={props.last.hits[0]._source.longDescription}
                    been={props.last.hits[0]._source.professionalAchievements==""? props.last.hits[0]._source.professionalArchievements: props.last.hits[0]._source.professionalAchievements}
                    red1={props.last.hits[0]._source.Red1}
                    red1Link={props.last.hits[0]._source.Red1Link}
                    red2={props.last.hits[0]._source.Red2}
                    red2Link={props.last.hits[0]._source.Red2Link}
                    red3={props.last.hits[0]._source.Red3}
                    red3Link={props.last.hits[0]._source.Red3Link}
                    star={props.last.hits[0]._source.AppearsInAnotherCategory}

                /> : <SearchCard key="0"
                    id="0"
                    index="SpecialCard"
                    name=""
                    img={resourceUrl+"/cargando.png"}
                    firtsLine=""
                    text=""
                    date=""
                    description=""
                    been=""
                />}</article>
    )
}