import styles from './footer.module.scss'
import { useIntl } from "react-intl"
import Image from 'next/image'

export default function Footer() {
  const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
    return (
<footer className={styles.footer}>
  <div className={styles.bigDiv}>
    <div className={styles.favicon}>
  <Image
          src="/favicon.png"
          alt={f("logo")}
          layout='responsive'
          width="0"
          height="0"
          objectFit="contain"
        />
        </div>


    <div className={styles.contact}>   
    <a href="/Contacto"> <h2 className={styles.nav__title}>{f("Contacto")}</h2> </a>
    
    <address className={styles.direction}>
    {f("Direccion")}<br/>
          
    </address>
    </div> 
  </div>
  
  <ul className={styles.footer__nav}>
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title}>{f("EscuelaIngenieria")}</h2>

      <ul className={styles.nav__ul}>
        <li>
          <a href="https://ingenieriainformatica.uniovi.es/">{f("PaginaWeb")}</a>
        </li>

        <li>
          <a href="https://ingenieriainformatica.uniovi.es/contacto">{f("Contacto")}</a>
        </li>
            
        <li>
          <a href="https://ingenieriainformatica.uniovi.es/infoacademica/grado">{f("InformacionAcademica")}</a>
        </li>
      </ul>
    </li>
    
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title}>{f("UniversidadOviedo")}</h2>
      
      <ul className={styles.nav__ul}>
        <li>
          <a href="https://www.uniovi.es/">{f("PaginaWeb")}</a>
        </li>
        
        <li>
          <a href="https://www.uniovi.es/contacto">{f("Contacto")}</a>
        </li>
        
        <li>
          <a href="https://www.uniovi.es/estudios/grados/-/asset_publisher/X5CYKURHdF1e/content/grado-en-ingenieria-informatica-del-software-2014;jsessionid=ABC9088952D25CE298F0251CCAC43688?redirect=%2Festudios%2Fgrados">Nuestro Grado</a>
        </li>
      </ul>
    </li>
    
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title}>{f("Legal")}</h2>
      
      <ul className={styles.nav__ul}>
        <li>
          <a href="https://www.uniovi.es/privacidad">{f("PoliticaPrivacidad")}</a>
        </li>
        
        <li>
          <a href="https://www.uniovi.es/politicacookies">{f("PoliticaCookies")}</a>
        </li>
        
        <li>
          <a href="https://ingenieriainformatica.uniovi.es/avisolegal">{f("AvisoLegal")}</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div className={styles.legal}>
    <p>&copy;{f("Copyright")}</p>
  </div>
</footer>
        
    )
}