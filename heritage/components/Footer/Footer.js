import styles from './footer.module.scss'
import { useIntl } from "react-intl"

export default function Footer() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
    return (
        <div className={styles.footer}>
            <p id={styles.copyright}>{f("Copyright")}</p>

            <p className={styles.word}>{f("AvisoLegal")} |</p>

            <p className={styles.word}>{f("PoliticaCookies")} |</p>

            <p className={styles.word}>{f("PoliticaPrivacidad")}</p>

        </div>
    )
}