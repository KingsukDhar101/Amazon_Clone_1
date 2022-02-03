import React, { useContext } from "react";
import FilterContext from "../Context/FilterContext";

export default function SearchBar() {
  let {filter, setFilter} = useContext(FilterContext);
  return (
    <>
      <input
        type="text"
        placeholder="search products"
        value={filter.search}
        onChange={(e) => {
          setFilter({...filter, search : e.target.value});
        }}
        
      />
    </>
  );
}
