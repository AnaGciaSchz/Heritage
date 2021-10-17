import SearchBar from "components/SearchBar/SearchBar.js"
import SearchResult from "components/SearchResult/SearchResult.js"
function ZonaExalumnado() {
    return (
        <div>
            <h1 className="title1">Zona de exalumnado</h1>
            <SearchBar/>            
            <SearchResult
            promotion = "Promoción 2021"
            />
            <SearchResult
            promotion = "Promoción 2020"
            />
                
        </div>
    );

}

export default ZonaExalumnado;