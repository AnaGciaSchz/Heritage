import MenuButton from './MenuButton.js'
import ImageWithLink from './ImageWithLink.js'

function Header(){
    return(
        <header>
            <ImageWithLink clase = "logo" 
            alt= 'Logo de Heritage, representa la plabra algo curvada, de color verde, con un remarcado que pone "EII" encima, en azul. Sobre las letras está la situeta de un oso mirando hacia abajo' 
            referencia= "/"
            img= "/HeritageLogo.png"/>

            <MenuButton clase= "menuButton__left" nombre="Historia de la EII" referencia= "/HistoriaEII"/>
            <MenuButton clase= "menuButton__left" nombre="Zona Exalumnado" referencia= "/about"/>
            <MenuButton clase= "menuButton__left" nombre="Zona Profesorado" referencia= "/about"/>
            <MenuButton clase= "menuButton__left" nombre="Zona Delegación" referencia= "/about"/>

            <MenuButton clase= "menuButton__right" nombre="Contacto" referencia= "/about"/>
            <MenuButton clase= "menuButton__right" nombre="Últimas altas" referencia= "/about"/>
            <MenuButton clase= "menuButton__right" nombre="¿Qué es Heritage?" referencia= "/about"/>
            <MenuButton clase= "menuButton__right" nombre="CRUD" referencia= "/about"/>   
             
        </header>
    )
}

export default Header;