import styles from './socialMedia.module.scss'
import ImageWithLink from "../ImageWithLink/ImageWithLink.js"
import { useIntl } from "react-intl"

export default function SocialMedia(props) {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  return (<>

    <section className={styles.container}>
      <h3>{f(props.socialMediaTitle)}</h3>

      <div className={styles.iconos}>
        <span className={styles.icon}>
          <ImageWithLink
            referencia={props.firstLink}
            img={props.firstImage}
            alt={props.firstAlt} />
        </span>

        <span className={styles.icon}>
          <ImageWithLink
            referencia={props.secondLink}
            img={props.secondImage}
            alt={props.secondAlt} />
        </span>

        <span className={styles.icon}>
          <ImageWithLink
            referencia={props.thirdLink}
            img={props.thirdImage}
            alt={props.thirdAlt} />
        </span>

        <span className={styles.icon}>
          <ImageWithLink
            referencia={props.fourthLink}
            img={props.fourthImage}
            alt={props.fourthAlt} />
        </span></div>
    </section>
  </>)
}