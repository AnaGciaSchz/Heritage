import MenuButton from '../MenuButton/MenuButton.js'
import ImageWithLink from '../ImageWithLink/ImageWithLink.js'
import style from './header.module.scss'
import { useIntl } from "react-intl"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"

export default function Header() {
const {formatMessage} = useIntl();
const f = id => formatMessage({ id })
const [header, setHeader] = useState(null);
const router = useRouter();



useEffect(() => {
    if(localStorage != null && localStorage.getItem('user') != null){
        setHeader(<header className={style.headerLogged} >
            <MenuButton nombre={f("historiaEII")} src= "headerIcons/historiaEII.png" referencia="/HistoriaEII" />
            <MenuButton nombre={f("ZExalumnado")} src= "headerIcons/egresados.png" referencia="/ZonaEgresados" />
            <MenuButton nombre={f("ZProfesorado")} src= "headerIcons/profesorado.png" referencia="/ZonaProfesorado" />
            <MenuButton nombre={f("ZDelegacion")} src= "headerIcons/delegados.png" referencia="/ZonaDelegacion" />

            <span className={style.logo}>
                <ImageWithLink
                    alt={f("logo")}
                    referencia={"/"+router.locale}
                    img="/HeritageLogo.png" />
            </span>

            <MenuButton nombre="Zona Admin" src= "headerIcons/admin.png" referencia="/ZonaAdmin" />
            <MenuButton nombre={f("SubidaDeCartas")} src= "headerIcons/subidaCartas.png" referencia="/SubidaDeCartas" />
            <MenuButton nombre={f("QueEsHeritage")} src= "headerIcons/queEsHeritage.png" referencia="/about" />
            <MenuButton nombre={f("Contacto")} src= "headerIcons/contacto.png" referencia="/Contacto" />


        </header>)
    }else{
        setHeader(<header className={style.headerNotLogged} >
            <MenuButton nombre={f("ZExalumnado")} src= "headerIcons/egresados.png" referencia="/ZonaEgresados" />
            <MenuButton nombre={f("ZProfesorado")} src= "headerIcons/profesorado.png" referencia="/ZonaProfesorado" />
            <MenuButton nombre={f("ZDelegacion")} src= "headerIcons/delegados.png" referencia="/ZonaDelegacion" />

            <span className={style.logo}>
                <ImageWithLink
                    alt={f("logo")}
                    referencia={"/"+router.locale}
                    img="/HeritageLogo.png" />
            </span>
            <MenuButton nombre={f("historiaEII")} src= "headerIcons/historiaEII.png" referencia="/HistoriaEII" />
            <MenuButton nombre={f("QueEsHeritage")} src= "headerIcons/queEsHeritage.png" referencia="/about" />
            <MenuButton nombre={f("Contacto")} src= "headerIcons/contacto.png" referencia="/Contacto" />


        </header>)
    }
    
}, [router.locale, router.asPath]);
    return (header)
}