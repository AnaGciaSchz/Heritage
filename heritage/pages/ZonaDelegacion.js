import SearchResult from "components/SearchResult/SearchResult.js"
import SearchBar from "components/SearchBar/SearchBar.js"
function ZonaDelegacion() {
    return (
        <div>
            <h1 className="title1">Zona de la Delegación</h1>
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

export default ZonaDelegacion;