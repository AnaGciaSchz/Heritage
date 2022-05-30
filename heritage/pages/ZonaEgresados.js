import SearchBar from "components/SearchComponents/SearchBar/SearchBar.js"
import { useState } from "react";
import { useIntl } from "react-intl"
import SearchLayout from "../components/SearchComponents/SearchLayout/SearchLayout";

import { useDispatch, } from 'react-redux';
import { changeInSearchBarByUser } from '../services/redux/features/search/searchSlice.js';

export default function ZonaEgresados() {

  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id })

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("asc");

  const dispatch = useDispatch()

  return (
    <>
      <h1 className="title1">{f("ZExalumnado")}</h1>
      <SearchBar
        setQuery={setQuery}
        setSort={setSort}
        setChange={() => dispatch(changeInSearchBarByUser())}
      />
      <SearchLayout
        query={query}
        sort={sort}
        index="student-card"
      />
    </>
  );

}