import MenuButton from '../MenuButton/MenuButton.js'
import ImageWithLink from '../ImageWithLink/ImageWithLink.js'
import style from './header.module.scss'
import { useIntl } from "react-intl"

export default function Header() {
const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
    return (
        <header className={style.header} >
            <span className={style.logo}>
                <ImageWithLink
                    alt={f("logo")}
                    referencia="/"
                    img="/HeritageLogo.png" />
            </span>

            <MenuButton nombre={f("historiaEII")} referencia="/HistoriaEII" />
            <MenuButton nombre={f("ZExalumnado")} referencia="/ZonaExalumnado" />
            <MenuButton nombre={f("ZProfesorado")} referencia="/ZonaProfesorado" />
            <MenuButton nombre={f("ZDelegacion")} referencia="/ZonaDelegacion" />

            <div className={style.spacer}></div>

            { /*<MenuButton nombre="CRUD" referencia= "/about"/>*/}
            <MenuButton nombre={f("QueEsHeritage")} referencia="/about" />
            <MenuButton nombre={f("UltimasAltas")} referencia="/UltimasAltas" />
            <MenuButton nombre={f("Contacto")} referencia="/Contacto" />


        </header>
    )
}