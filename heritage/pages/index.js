import Slider from "components/Slider/Slider.js"
import Notice from "components/Notice/Notice.js"
import ImageWithLink from "components/ImageWithLink/ImageWithLink.js"

export default function Home() {
  return (
    <div>
      <h1 className = "title1">Página principal</h1>
      <Slider></Slider>
      <h2 className = "title1">Noticias</h2>
      <div className= "noticefeed">
        <Notice
        alt= 'Noticia 1 para hacer pruebas'
        referencia= "https://www.uniovi.es/"
        img= "/notices/Guarderia.png"
        text = "¡Extra extra! La Universidad de Oviedo reformará las salas de estudio de la EII. 'Ya era hora' dice un estudiante octogenario."/>
        
        <Notice
        alt= 'Noticia 2 para hacer pruebas'
        referencia= "https://ingenieriainformatica.uniovi.es/"
        img= "/notices/Lofi software.png"
        text = "La Escuela de Ingeniería Informática crea su propia playlist LoFi en Spotify"/>
        

        <Notice
        alt= 'Noticia 3 para hacer pruebas'
        referencia= "https://www.civinext.com/whale.aspx"
        img= "/notices/Love Whales.png"
        text = "Nunca creerías lo que persigue esta ballena"/>
        
      </div>

        <h2 className = "title1">Redes Sociales</h2>

      <div className= "socialTitle">
        <h3 className = "title1">Redes Sociales EII</h3>
        <span></span>
        <h3 className = "title1">Redes Sociales DEII</h3>
      </div>

      <div className = "socialFeed">
          <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://www.instagram.com/computingoviedo/"
              img="/social/instaEII.png"
              alt="Icono para acceder al instagram de la EII"/>
              </span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://es-es.facebook.com/computingOviedo/"
              img="/social/facebook.png"
              alt="Icono para acceder al facebook de la EII"/>
              </span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://www.youtube.com/channel/UCpv73ltAXuh1LRRJu8NWIvA"
              img="/social/youEII.png"
              alt="Icono para acceder al youtube de la EII"/>
              </span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://twitter.com/computingoviedo"
              img="/social/twEII.png"
              alt="Icono para acceder al twitter de la EII"/>
              </span>

            <span></span>
            <span></span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://www.instagram.com/delegacion_eii/"
              img="/social/instaDEII.png"
              alt="Icono para acceder al instagram de la DEII"/>
              </span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://discord.gg/bkR5Ye4"
              img="/social/discord.png"
              alt="Icono para acceder al discord de la DEII"/>
              </span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://www.youtube.com/channel/UCPGJQuCxNQ5JQtrzTE0NpJg"
              img="/social/youDEII.png"
              alt="Icono para acceder al youtube de la DEII"/>
              </span>

              <span className= "icono">
          <ImageWithLink className= "icono"
              referencia="https://twitter.com/delegacion_eii"
              img="/social/twDEII.png"
              alt="Icono para acceder al twitter de la DEII"/>
              </span>
        </div>
    </div>
  )
  }
