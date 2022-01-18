import SearchLayout from "../components/SearchLayout/SearchLayout";
import { useState } from "react";
import { useIntl } from "react-intl"
import SearchBar from "components/SearchBar/SearchBar.js"

export default function ZonaProfesorado() {
    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })
    const [query, setQuery] = useState("");
    const [change, setChange] = useState(false);
    return (
        <>
            <h1 className="title1">{f("ZProfesorado")}</h1>
            <SearchBar
                setQuery={setQuery}
                setChange={setChange}
            />
            <SearchLayout
                query={query}
                index="professor-card"
                change={change}
            />
        </>
    );

}