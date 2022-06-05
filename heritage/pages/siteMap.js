import { useIntl } from "react-intl"
import { useRouter } from "next/router"

export default function siteMap() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const router = useRouter()

  return (<section>
      <h1>{f("MapaSitioWeb")}</h1>
      <ul>
          <li>
              <p><a href={'/'+router.locale}>{f("paginaPrincipal")}</a></p>
          </li>
          <li>
              <p><a href={'/'+router.locale+'/HistoriaEII'}>{f("historiaEII")}</a></p>
          </li>
          <li>
          <p><a href={'/'+router.locale+'/ZonaEgresados'}>{f("ZExalumnado")}</a></p>
          </li>
          <li>
          <p><a href={'/'+router.locale+'/ZonaProfesorado'}>{f("ZProfesorado")}</a></p>
          </li>
          <li>
          <p><a href={'/'+router.locale+'/ZonaDelegacion'}>{f("ZDelegacion")}</a></p>
          </li>
          <li>
          <p><a href={'/'+router.locale+'/about'}>{f("QueEsHeritage")}</a></p>
          </li>
          <li>
          <p><a href={'/'+router.locale+'/Contacto'}>{f("Contacto")}</a></p>
          </li>
      </ul>
      
  </section>)
}