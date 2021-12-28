import SearchBar from "components/SearchBar/SearchBar.js"
import SearchResult from "components/SearchResult/SearchResult.js"
import Result from "components/Result/Result.js"
function ZonaEgresados() {
    return (
        <div>
            <h1 className="title1">Zona Egresados</h1>
            <SearchBar/>    
            <Result
            query=""
            index="student-card"
            />                         
        </div>
    );

}

export default ZonaEgresados;