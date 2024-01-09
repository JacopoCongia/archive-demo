import { useState } from "react";

function SearchBar({ setTerm }) {
  const handleSearchChange = (event) => {
    event.preventDefault();
    setTerm(event.target.value);
  };

  return (
    <>
      <input
        type="search"
        onChange={(e) => handleSearchChange(e)}
        placeholder="Search"
        className="w-[80%]"
      />
    </>
  );
}

export default SearchBar;
