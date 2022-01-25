import MenuButton from '../MenuButton/MenuButton.js'
import ImageWithLink from '../ImageWithLink/ImageWithLink.js'
import style from './header.module.scss'
import { useIntl } from "react-intl"

export default function Header() {
const {formatMessage} = useIntl();
  const f = id => formatMessage({ id })
    return (
        <header className={style.header} >
            <MenuButton nombre={f("historiaEII")} src= "headerIcons/historiaEII.png" referencia="/HistoriaEII" />
            <MenuButton nombre={f("ZExalumnado")} src= "headerIcons/egresados.png" referencia="/ZonaEgresados" />
            <MenuButton nombre={f("ZProfesorado")} src= "headerIcons/profesorado.png" referencia="/ZonaProfesorado" />
            <MenuButton nombre={f("ZDelegacion")} src= "headerIcons/delegados.png" referencia="/ZonaDelegacion" />

            <span className={style.logo}>
                <ImageWithLink
                    alt={f("logo")}
                    referencia="/"
                    img="/HeritageLogo.png" />
            </span>

            <MenuButton nombre="Zona Admin" src= "headerIcons/admin.png" referencia="/about" />
            <MenuButton nombre={f("SubidaDeCartas")} src= "headerIcons/subidaCartas.png" referencia="/SubidaDeCartas" />
            <MenuButton nombre={f("QueEsHeritage")} src= "headerIcons/queEsHeritage.png" referencia="/about" />
            <MenuButton nombre={f("Contacto")} src= "headerIcons/contacto.png" referencia="/Contacto" />


        </header>
    )
}