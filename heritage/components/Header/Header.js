import MenuButton from '../MenuButton/MenuButton.js'
import ImageWithLink from '../ImageWithLink/ImageWithLink.js'
import style from './header.module.scss'

function Header(){
    return(
        <header className={style.header} >
            <span className={style.logo}>
                <ImageWithLink
            alt= 'Logo de Heritage, representa la plabra algo curvada, de color verde, con un remarcado que pone "EII" encima, en azul. Sobre las letras está la situeta de un oso mirando hacia abajo'
            referencia= "/"
            img= "/HeritageLogo.png"/>
            </span>

            <MenuButton nombre="Historia de la EII" referencia= "/HistoriaEII"/>
            <MenuButton nombre="Zona Exalumnado" referencia= "/ZonaExalumnado"/>
            <MenuButton nombre="Zona Profesorado" referencia= "/ZonaProfesorado"/>
            <MenuButton nombre="Zona Delegación" referencia= "/BusquedaGenerica"/>

            <div className={style.spacer}></div>

            { /*<MenuButton nombre="CRUD" referencia= "/about"/>*/}
            <MenuButton nombre="¿Qué es Heritage?" referencia= "/about"/>
            <MenuButton nombre="Últimas altas" referencia= "/UltimasAltas"/>
            <MenuButton nombre="Contacto" referencia= "/Contacto"/>
            

        </header>
    )
}

export default Header;