import style from './noResult.module.scss'
import MenuButton from "../MenuButton/MenuButton"
import { useIntl } from "react-intl"
import { useRouter } from "next/router"

export default function NoResult() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })

    const router = useRouter();

    return (<>
    <h2 className='title2'>{f("NoResultados")}</h2>
    <p className={style.text}>{f("MensajeNoResultados")}</p>
    <div className={style.buttons}>
    {router.pathname.includes('ZonaEgresados')?null:<MenuButton nombre={f("ZExalumnado")} src= "headerIcons/egresados.png" referencia="/ZonaEgresados" />}
    {router.pathname.includes('ZonaProfesorado')?null:<MenuButton nombre={f("ZProfesorado")} src= "headerIcons/profesorado.png" referencia="/ZonaProfesorado" />}
    {router.pathname.includes('ZonaDelegacion')?null:<MenuButton nombre={f("ZDelegacion")} src= "headerIcons/delegados.png" referencia="/ZonaDelegacion" />}
    </div>
    </>
        
    )
}