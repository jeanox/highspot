import React, { useState, useRef } from "react";
import _ from 'lodash';

// console.log(`SETQUERY, AFTER: ${searchTerms}`); // Loads first, returns empty string

let searchTerms = 'biki';

const Search = () => {

  const groomSearchTerms = rawTerms => {
    searchTerms = rawTerms.split(' ').join('|');

    console.log(`SETQUERY: ${searchTerms}`); // RETURNS A THING!
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [bikiQuery, setBikiQuery] = useState(searchTerms);
  const delayedQuery = useRef(_.debounce(q => groomSearchTerms(q), 500)).current;
  
  const onChange = e => {
    setSearchQuery(e.target.value);
    delayedQuery(e.target.value);
    
    console.log(`SEARCH ONCHANGE: ${searchTerms}`); // RETURNS A THING!

  };
 
  return (
    <div>
      <label>Search for stuff</label>
      <input
        type="text"
        value={searchQuery}
        placeholder="type a thing"
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
