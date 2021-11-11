import React, { useState } from 'react'

function SearchControl(DataFilter,removeFilterColumn) {

    const [stateSearch, setSearch] = useState({
        searchBy: ''
    });
    let [stateFilter, setFilter] = useState([]);
    let [stateCheckFilterValue, setCheckFilterValue] = useState(false);


    const onInputChange = (e) => {
        setSearch({ ...stateSearch, searchBy: e.target.value })

    }

    const DataValue = stateFilter.length === 0 && stateCheckFilterValue === false ? DataFilter : stateFilter
    const onSearchClick = () => {
        if (stateSearch.searchBy !== "") {
            const lowercasedValue = stateSearch.searchBy.toLowerCase().trim();
            setFilter(DataFilter.filter(item => {
                return Object.keys(item).some(key =>
                    removeFilterColumn.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            }));

        } else {
            setCheckFilterValue(false)
            setFilter(DataFilter);
        }

    }

    return {
        onSearchClick,
        onInputChange,
        DataValue,
        stateFilter,
        setFilter
    }
}

export default SearchControl
