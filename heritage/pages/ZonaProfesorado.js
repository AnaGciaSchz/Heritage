import SearchResult from "components/SearchResult/SearchResult.js"
import SearchBar from "components/SearchBar/SearchBar.js"
function ZonaProfesorado() {
    return (
        <div>
            <p><b>Español</b>/Asturianu/English</p>
            <h1 className="title1">Zona de profesorado</h1>
            <SearchBar/>            
            <SearchResult
            promotion = "Comienzo 2021"
            />
            <SearchResult
            promotion = "Comienzo 2020"
            />
        </div>
    );

}

export default ZonaProfesorado;