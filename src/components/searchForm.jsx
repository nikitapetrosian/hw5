import React from "react";
import PropTypes from "prop-types";
import api from "../api";
// const posts = api.users.fetchAll()
console.log(api.users.fetchAll());
const SearchForm = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            <form action="/" method="get">
                <input
                    className="form-control mr-sm-2"
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="Поиск"
                    name='search'
                />
            </form>

        </>
    );
};
SearchForm.propTypes = {
    searchQuery: PropTypes.string,
    setSearchQuery: PropTypes.func
};
export default SearchForm;
