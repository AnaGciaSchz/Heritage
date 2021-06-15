import SearchCard from "components/SearchCard/SearchCard.js"
function BusquedaGenerica(){
    return (
        <div>
            <p><b>Español</b>/Asturianu/English</p>
      <h1 className = "title1">Página de Fichas genérica</h1>
      <SearchCard
        name = "Ana María García Sánchez"
        img = "/Ana.jpg"
        alt = "Imagen"
        firtsLine = "Promoción 2020-2021"
        text = "Estudiante de cuarto curso, está intentando recordar cómo se programaba con React."/>
        </div>
    );

}

export default BusquedaGenerica;