import { useState } from "react";

const SearchBar = ({handleSearch}) => {
  const[search,setSearch]=useState ("");
  return (
    <form className="d-flex " style={barSizing} onSubmit={(e)=>{
      e.preventDefault();
      handleSearch(search)
           console.log("SEARCH VALUE:", search); 
    }}>
      <input
        className="border border-secondary border-end rounded-start-pill ps-3 "
        type="text"
        placeholder="Search"
        aria-label="Recipient’s username"
        style={{ ...height, ...srcSizing }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="btn border-secondary rounded-0 border-start-0 rounded-end-pill d-flex justify-content-center align-items-center bg-white"
        type="submit"
        style={height}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

const height = {
  height: "30px",
};
const barSizing = {
  marginRight: "8%",
};
const srcSizing = {
  maxWidth: "20rem",
  width: "75vw",
};
export default SearchBar;
