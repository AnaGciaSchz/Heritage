import SearchLayout from "../components/SearchComponents/SearchLayout/SearchLayout";
import { useState } from "react";
import { useIntl } from "react-intl"
import SearchBar from "components/SearchComponents/SearchBar/SearchBar.js"

import { useDispatch, } from 'react-redux';
import { changeInSearchBarByUser } from '../services/redux/features/search/searchSlice.js';

export default function ZonaDelegacion() {

    const { formatMessage } = useIntl();
    const f = id => formatMessage({ id })

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("asc");

    const dispatch = useDispatch()
    return (
        <section>
            <h1>{f("ZDelegacion")}</h1>
            <SearchBar
                setQuery={setQuery}
                setSort={setSort}
                setChange={() => dispatch(changeInSearchBarByUser())}
            />
            <SearchLayout
                query={query}
                sort={sort}
                index="delegate-card"
            />
        </section>
    );

}