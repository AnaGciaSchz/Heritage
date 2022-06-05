import MenuButton from '../MenuButton/MenuButton.js'
import cookieCutter from "cookie-cutter"
import styles from './header.module.scss'
import { useIntl } from "react-intl"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Image from 'next/image'

export default function Header() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    const [header, setHeader] = useState(null);
    const router = useRouter();



    useEffect(() => {
        if (cookieCutter.get('userName') != null) {
            setHeader(<header className={styles.container}>

                <div className={styles.logoArriba}>
                    <a href={"/" + router.locale}>

                        <img src='/HeritageLogo.png' alt='logo' />
                    </a>
                </div>


                <nav className={styles.menu}>
                    <MenuButton nombre={f("historiaEII")} src="headerIcons/historiaEII.png" referencia="/HistoriaEII" />
                    <MenuButton nombre={f("ZExalumnado")} src="headerIcons/egresados.png" referencia="/ZonaEgresados" />
                    <MenuButton nombre={f("ZProfesorado")} src="headerIcons/profesorado.png" referencia="/ZonaProfesorado" />
                    <MenuButton nombre={f("ZDelegacion")} src="headerIcons/delegados.png" referencia="/ZonaDelegacion" />

                    <div className={styles.logoAbajo}>
                        <a href={"/" + router.locale}>

                            <img src='/HeritageLogo.png' alt='logo'  className={styles.logo}/>
                        </a>
                    </div>

                    <MenuButton nombre={f("EditorHistoria")} src="headerIcons/admin.png" referencia="/EditorHistoria"/>
                    <MenuButton nombre={f("SubidaDeCartas")} src="headerIcons/subidaCartas.png" referencia="/SubidaDeCartas" />
                    <MenuButton nombre={f("QueEsHeritage")} src="headerIcons/queEsHeritage.png" referencia="/about" />
                    <MenuButton nombre={f("Contacto")} src="headerIcons/contacto.png" referencia="/Contacto" />
                </nav>



            </header>)
        } else {
            setHeader(<header className={styles.headerNotLogged} >
                <MenuButton nombre={f("ZExalumnado")} src="headerIcons/egresados.png" referencia="/ZonaEgresados" />
                <MenuButton nombre={f("ZProfesorado")} src="headerIcons/profesorado.png" referencia="/ZonaProfesorado" />
                <MenuButton nombre={f("ZDelegacion")} src="headerIcons/delegados.png" referencia="/ZonaDelegacion" />

                <span className={styles.logo}>
                    <a href={"/" + router.locale} target="_blank">
                        <Image className={styles.image}
                            src="/HeritageLogo.png"
                            alt={f("logo")}
                            layout='responsive'
                            width="0"
                            height="0"
                            objectFit="contain"
                        />
                    </a>
                </span>
                <MenuButton nombre={f("historiaEII")} src="headerIcons/historiaEII.png" referencia="/HistoriaEII" />
                <MenuButton nombre={f("QueEsHeritage")} src="headerIcons/queEsHeritage.png" referencia="/about" />
                <MenuButton nombre={f("Contacto")} src="headerIcons/contacto.png" referencia="/Contacto" />


            </header>)
        }

    }, [router.locale, router.asPath]);
    return (header)
}