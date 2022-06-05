import styles from './footer.module.scss'
import { useIntl } from "react-intl"
import { useRouter } from "next/router"

export default function Footer() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const router = useRouter()

  return (
    <footer className={styles.footer}>
      <section>

        <div className={styles.legal}>
          <p>&copy; {f("Copyright")}</p>
        </div>
      </section>

      <div className={styles.contenido}>
      <img className={styles.petra} src='/favicon.png' />
        <section>
          <h2><a href={'/'+router.locale+'/Contacto'}>{f("Contacto")}</a> | <a href={'/'+router.locale+'/siteMap'}>{f("MapaSitioWeb")}</a> </h2>

          <address>
            {f("Direccion")}<br />

          </address>
        </section>


        <section>
          <h2>{f("EscuelaIngenieria")}</h2>

          <ul className={styles.nav__ul}>
            <li>
              <a href="https://ingenieriainformatica.uniovi.es/" target="_blank">{f("PaginaWeb")}</a>
            </li>

            <li>
              <a href="https://ingenieriainformatica.uniovi.es/contacto" target="_blank">{f("Contacto")}</a>
            </li>

            <li>
              <a href="https://ingenieriainformatica.uniovi.es/infoacademica/grado" target="_blank">{f("InformacionAcademica")}</a>
            </li>
          </ul>
        </section>

        <section>
          <h2>{f("UniversidadOviedo")}</h2>

          <ul className={styles.nav__ul}>
            <li>
              <a href="https://www.uniovi.es/" target="_blank">{f("PaginaWeb")}</a>
            </li>

            <li>
              <a href="https://www.uniovi.es/contacto" target="_blank">{f("Contacto")}</a>
            </li>

            <li>
              <a href="https://www.uniovi.es/estudios/grados/-/asset_publisher/X5CYKURHdF1e/content/grado-en-ingenieria-informatica-del-software-2014;jsessionid=ABC9088952D25CE298F0251CCAC43688?redirect=%2Festudios%2Fgrados" target="_blank">Nuestro Grado</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.nav__title}>{f("Legal")}</h2>

          <ul className={styles.nav__ul}>
            <li>
              <a href="https://www.uniovi.es/privacidad" target="_blank">{f("PoliticaPrivacidad")}</a>
            </li>

            <li>
              <a href="https://www.uniovi.es/politicacookies" target="_blank">{f("PoliticaCookies")}</a>
            </li>

            <li>
              <a href="https://ingenieriainformatica.uniovi.es/avisolegal" target="_blank">{f("AvisoLegal")}</a>
            </li>
          </ul>
        </section>
      </div>
    </footer>

  )
}