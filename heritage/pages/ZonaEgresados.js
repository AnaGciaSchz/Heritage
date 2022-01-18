import SearchBar from "components/SearchBar/SearchBar.js"
import { useState } from "react";
import { useIntl } from "react-intl"
import SearchLayout from "../components/SearchLayout/SearchLayout";

export default function ZonaEgresados() {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })
  const [query, setQuery] = useState("");
  const [change, setChange] = useState(false);

  return (
    <>
      <h1 className="title1">{f("ZExalumnado")}</h1>
      <SearchBar
        setQuery={setQuery}
        setChange={setChange}
      />
      <SearchLayout
        query={query}
        index="student-card"
        change={change}
      />
    </>
  );

}