import React, { useState, useRef } from "react";
import _ from 'lodash';

let bikiArr = [];

// Grab data, transform it, share it
const pushToArr = pushIt => {
  bikiArr = []; // reset it
  bikiArr.push(pushIt);
}

// Delay queries while rendering component
const Search = () => {

  const groomSearchTerms = rawTerms => {
    searchTerms = rawTerms.split(' ').join('|');
    // let searchTerms = bikiArr.push(rawTerms);

    // console.log(`SETQUERY: ${searchTerms}`); // RETURNS A THING!
  };
  
  const [searchQuery, setSearchQuery] = useState("");
  const delayedQuery = useRef(_.debounce(q => groomSearchTerms(q), 500)).current;
  
  const onChange = e => {
    setSearchQuery(e.target.value);
    delayedQuery(e.target.value);
    
    // console.log(`SEARCH ONCHANGE: ${searchTerms}`); // RETURNS A THING!

    pushToArr(searchTerms);
    console.log(`BIKI ARR: ${bikiArr}`);

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
export let searchTerms = bikiArr;
