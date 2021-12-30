import SearchBar from "components/SearchBar/SearchBar.js"
import Result from "components/Result/Result.js"
import { useState } from "react";
import { useIntl } from "react-intl"

function ZonaEgresados() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    const [query, setQuery] = useState("");
    const [change, setChange] = useState(false);
    return (
        <div>
            <h1 className="title1">{f("ZExalumnado")}</h1>
            <SearchBar
            setQuery = {setQuery}
            setChange={setChange}
            />    
            <Result
            query= {query}
            index="student-card"
            change = {change}
            />                         
        </div>
    );

}

export default ZonaEgresados;