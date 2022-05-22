

import styles from './searchCardWithTitle.module.scss'
import SearchCard from "components/SearchComponents/SearchCard/SearchCard.js"
import { useIntl } from "react-intl"


export default function SearchCardWithTitle(props) {

    const { formatMessage } = useIntl()
    const f = id => formatMessage({ id })
    return (
        <>
            <h3 className={styles.title}>{f(props.title)}</h3>
            {props.last!=null?
            <SearchCard
            id= {props.last.hits[0]._id}
            index = {props.last.hits[0]._index}
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
          
      />:<SearchCard  key = "0"
      id= "0"
      index = "SpecialCard"
      name= "Ana María García Sánchez"
      img="/AnaGs.jpg"
      firtsLine="2022-2023"
      text="Estudiante de la EII y autora de este TFG"
      date="13/05/2022"
      description="Ana es una estudiante del Grado de Ingeniería Informática del Software que espera entregar este TFG en 2022 y conseguir así su título."
      been="Dentro de sus logros podemos encontrar el atreverse a diseñar Heritage desde 0, intentar que la página sea responsive o escribir esta carta especial con información de ella. "
      red1="LinkedIn"
      red1Link="https://www.linkedin.com/in/anagciaschz/"
      red2="GitHub"
      red2Link="https://github.com/AnaGciaSchz"
      star="true"
  />}</>
    )
}