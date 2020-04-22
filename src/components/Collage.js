import React, { useState, useRef } from "react";
import axios from 'axios';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

// INIT variables/values
let searchTerms = '';
let currentPage = 1;
let clearResults = false;
let isSearch = false;
let isDone = false;

const apiRoot = "https://api.elderscrollslegends.io/v1/cards";
let query = apiRoot;

// I feel like this could be busted out into its own file
const Card = ({ aKey, url, title, copy, set, type }) => (
  <div className="card--wrap" key={aKey} >
    <div className="card__meta">
      <p className="">{set}</p>
      <p className="">{type}</p>
    </div>
    <div className="card__image">
      <img src={url} alt={title}/>
      {/* <pre>{url}</pre> */}
    </div>
    <div className="card__copy">
      <p className="copy--title">{title}</p>
      {/* This should account for multiple paragraphs later */}
      <p className="copy--text">{copy}</p> 
    </div>
  </div>
);

const Collage = () => {

  const [cardData, setCardData] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const groomSearchTerms = rawTerms => {
    searchTerms = rawTerms.split(' ').join(',');
    // could regex for weird characters and multiple empty spaces
  };
  

  // limit the queries so that they're not sending out with every character input
  // Debounce troubles, commenting out for now
  // const delayedQuery = useRef(_.debounce(q => groomSearchTerms(q), 20)).current;
  
  const onChange = e => {
    setSearchQuery(e.target.value);
    // delayedQuery(e.target.value);
    groomSearchTerms(e.target.value); // IF NO DEBOUNCE

    // Set Query
    query = `${apiRoot}?pageSize=20&page=1&name=${searchTerms}`;
    
    // RESET Page
    currentPage = 1;

    // RESET Cards
    clearResults = true;

    // console.log(`onChange: searchTerms: ${e.target.value} | Card Data:${cardData} | Clear Results: ${clearResults}`);
    console.log(`onChangeQ: query: ${query}`);
    
    // cardData.splice(0, cardData.length);
    fetchCardData();

    if (searchTerms.length > 0) {
      isSearch = true;
    } else {
      isSearch = false;
    }
    console.log(`IS SEARCH: ${isSearch}`)

    // renderGallery();
  };

  // We're going to load things in batches (pages), which means we'll need to increment with each call
  // initially set it to true so that the first call gets fired before scroll-triggered loading commences
  let morePages = true;



  React.useEffect(() => {
    fetchCardData();
  }, []); // AHHHH, i missed the second argument and it was infinitely looping. Details :}

  const fetchCardData = (count = 20) => {

    query = `${apiRoot}?pageSize=${count}&page=${currentPage}&name=${searchTerms}`;
    console.log(`QUERY(fetch): ${query}`);

    axios
      .get( query,{
        params: {
          pageSize: 20
        }
      })
      .then(response => {

        currentPage = currentPage + 1;

        // FIND A WAY to track if a search is happening.
        if (isSearch) {
          setCardData(response.data.cards);
          isSearch = false;
        } else {
          setCardData([...cardData, ...response.data.cards]);
        }

        setIsLoaded(true);

        console.log(response.data.cards.length);

        if (response.data.cards.length === 0) {
          isDone = true;
        }

        // Keep an eye on how much junk we got! ;D
        // console.log(`Current Page: ${currentPage}, Card Data: ${cardData.length}, More Pages: ${morePages}`);
      })
      .catch(function (error) {
        console.log(`Server ERROR: ${error}`);
      })
      
  };

  const checkMorePages = () => {

    console.log(`IS DONE?: ${isDone}`);

    if (cardData.length >= 20) {
      morePages = true;
    } else if (isDone === true) {
      morePages = false;
    } else {
      morePages = false;
    }

    console.log(`MORE PAGES?: ${morePages}, length: ${cardData.length}`);
    return morePages;
  }

  let biki;
  let bikiCount = 0;

  const renderGallery = () => {
    if (clearResults === true) {
      biki =
      <InfiniteScroll
          dataLength={cardData}
          next={() => fetchCardData(20) } 
          hasMore={checkMorePages()}
          loader={
            <img
              src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
              alt="loading"
            />
          }
          endMessage={<p>No more results</p>}
        >
          <div className="image-grid" style={{ marginTop: "30px" }}>
            {loaded
              ? cardData.map((card, index) => (
                  <Card
                    key={index}
                    title={card.name}
                    copy={card.text}
                    url={card.imageUrl}
                    set={card.set.name}
                    type={card.type}
                  />
                ))
              : ""}
          </div>
        </InfiniteScroll>
      // console.log(`render QUERY(clear): ${JSON.stringify(cardData)}`);
    } else {
      // console.log(`render QUERY(load): ${query}`);
      biki = 
        <InfiniteScroll
          dataLength={cardData}
          next={() => fetchCardData(20) } 
          hasMore={checkMorePages()}
          loader={
            <img
              src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
              alt="loading"
            />
          }
          endMessage={<p>No more results</p>}
        >
          <div className="image-grid" style={{ marginTop: "30px" }}>
            {loaded
              ? cardData.map((card, index) => (
                  <Card
                    key={index}
                    title={card.name}
                    copy={card.text}
                    url={card.imageUrl}
                    set={card.set.name}
                    type={card.type}
                  />
                ))
              : ""}
          </div>
        </InfiniteScroll>
      ;
    }
    return biki;
  }

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">

          <label>Search for stuff</label>
          <input
            type="text"
            value={searchQuery}
            placeholder="type a thing"
            onChange={onChange}
          />

          {renderGallery()}

        </div>
      </div>
    </div>
  );
};

export default Collage;
