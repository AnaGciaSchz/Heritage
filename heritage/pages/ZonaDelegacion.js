import SearchLayout from "../components/SearchComponents/SearchLayout/SearchLayout";
import { useState } from "react";
import { useIntl } from "react-intl"
import SearchBar from "components/SearchComponents/SearchBar/SearchBar.js"

export default function ZonaDelegacion() {
    const {formatMessage} = useIntl();
    const f = id => formatMessage({ id })
    const [query, setQuery] = useState("");
    const [change, setChange] = useState(false);
    return (
        <>
            <h1 className="title1">{f("ZDelegacion")}</h1>
            <SearchBar
            setQuery = {setQuery}
            setChange={setChange}
            />    
            <SearchLayout
                query={query}
                index="delegate-card"
                change={change}
            />                      
        </>
    );

}