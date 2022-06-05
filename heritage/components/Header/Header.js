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

                <a className={styles.go2main} href="#main" tabIndex="1">{f("SaltarContenido")}</a>

                <div className={styles.logoArriba} tabIndex='2'>
                    <a href={"/" + router.locale}>

                        <img src='/HeritageLogo.png' alt='logo' />
                    </a>
                </div>


                <nav className={styles.menu}>
                    <MenuButton nombre={f("historiaEII")} src="headerIcons/historiaEII.png" referencia="/HistoriaEII" tabIndex='3' />
                    <MenuButton nombre={f("ZExalumnado")} src="headerIcons/egresados.png" referencia="/ZonaEgresados" tabIndex='4' />
                    <MenuButton nombre={f("ZProfesorado")} src="headerIcons/profesorado.png" referencia="/ZonaProfesorado" tabIndex='5' />
                    <MenuButton nombre={f("ZDelegacion")} src="headerIcons/delegados.png" referencia="/ZonaDelegacion" tabIndex='6' />

                    <div className={styles.logoAbajo} tabIndex='2'>
                        <a href={"/" + router.locale}>

                            <img src='/HeritageLogo.png' alt='logo' className={styles.logo} />
                        </a>
                    </div>

                    <MenuButton nombre={f("EditorHistoria")} src="headerIcons/admin.png" referencia="/EditorHistoria" tabIndex='7' />
                    <MenuButton nombre={f("SubidaDeCartas")} src="headerIcons/subidaCartas.png" referencia="/SubidaDeCartas" tabIndex='8' />
                    <MenuButton nombre={f("QueEsHeritage")} src="headerIcons/queEsHeritage.png" referencia="/about" tabIndex='9' />
                    <MenuButton nombre={f("Contacto")} src="headerIcons/contacto.png" referencia="/Contacto" tabIndex='10' />
                </nav>



            </header>)
        } else {
            setHeader(<header className={styles.container} >
                
                 <a className={styles.go2main} href="#main" tabIndex="1">{f("SaltarContenido")}</a>

                <div className={styles.logoArriba} tabIndex='2'>
                    <a href={"/" + router.locale}>

                        <img src='/HeritageLogo.png' alt='logo' />
                    </a>
                </div>

                <nav className={styles.menu}>
                    <MenuButton nombre={f("ZExalumnado")} src="headerIcons/egresados.png" referencia="/ZonaEgresados"  tabIndex='3'/>
                    <MenuButton nombre={f("ZProfesorado")} src="headerIcons/profesorado.png" referencia="/ZonaProfesorado" tabIndex='4' />
                    <MenuButton nombre={f("ZDelegacion")} src="headerIcons/delegados.png" referencia="/ZonaDelegacion" tabIndex='5' />

                    <div className={styles.logoAbajo} tabIndex='2'>
                        <a href={"/" + router.locale}>

                            <img src='/HeritageLogo.png' alt='logo' className={styles.logo} />
                        </a>
                    </div>

                    <MenuButton nombre={f("historiaEII")} src="headerIcons/historiaEII.png" referencia="/HistoriaEII" tabIndex='6' />
                    <MenuButton nombre={f("QueEsHeritage")} src="headerIcons/queEsHeritage.png" referencia="/about" tabIndex='7' />
                    <MenuButton nombre={f("Contacto")} src="headerIcons/contacto.png" referencia="/Contacto" tabIndex='8' />

                </nav>
            </header>)
        }

    }, [router.locale, router.asPath]);
    return (header)
}