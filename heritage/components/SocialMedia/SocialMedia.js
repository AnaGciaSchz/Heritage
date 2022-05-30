import styles from './socialMedia.module.scss'
import ImageWithLink from "../ImageWithLink/ImageWithLink.js"
import { useIntl } from "react-intl"

export default function SocialMedia(props) {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  return (<div className={styles.container}>

    <div className={styles.socialTitle}>
      <h3 className="title2">{f(props.socialMediaTitle)}</h3>
    </div>

    <div className={styles.socialFeed}>
      <span className={styles.icono}>
        <ImageWithLink className={styles.icono}
          referencia={props.firstLink}
          img={props.firstImage}
          alt={props.firstAlt} />
      </span>

      <span className={styles.icono}>
        <ImageWithLink className={styles.icono}
          referencia={props.secondLink}
          img={props.secondImage}
          alt={props.secondAlt} />
      </span>

      <span className={styles.icono}>
        <ImageWithLink className={styles.icono}
          referencia={props.thirdLink}
          img={props.thirdImage}
          alt={props.thirdAlt} />
      </span>

      <span className={styles.icono}>
        <ImageWithLink className={styles.icono}
          referencia={props.fourthLink}
          img={props.fourthImage}
          alt={props.fourthAlt} />
      </span></div></div>)
}