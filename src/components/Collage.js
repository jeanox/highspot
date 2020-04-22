import React, { useState, useRef } from "react";
import axios from 'axios';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

// INIT variables/values
let searchTerms = '';
let currentPage = 1;
let clearResults = false;

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


  // STATE OF BIKI BRAIN:
  // Having trouble rendering the Search Results -- can render strings, but re-rendering the component is odd;
  // DO: paranoia commit, remove all comments and start fresh
  // TRY: outputting the data being fetched to make sure the query isn't the issue
  // THEN TRY: scoping out how things are rendered so that conditionals actually apply
  // THEN TRY: a state-based solution, since state is the thing that's changing, tbh


  const groomSearchTerms = rawTerms => {
    searchTerms = rawTerms.split(' ').join('|');
    // could regex for weird characters and multiple empty spaces

    console.log(`SETQUERY: ${searchTerms}`); // RETURNS A THING!
  };
  
  const [searchQuery, setSearchQuery] = useState("");

  // limit the queries so that they're not sending out with every character input
  const delayedQuery = useRef(_.debounce(q => groomSearchTerms(q), 500)).current;
  
  const onChange = e => {
    setSearchQuery(e.target.value);
    delayedQuery(e.target.value);

    // Set Query
    query = `${apiRoot}?pageSize=20&page=1&name=${searchTerms}`;
    
    // RESET Page
    currentPage = 1;

    // RESET Cards
    clearResults = true;

    fetchCardData();

    renderGallery();
    
    console.log(`CLEAR RESULTS?: ${clearResults}`);
  };

  // We're going to load things in batches (pages), which means we'll need to increment with each call
  // initially set it to true so that the first call gets fired before scroll-triggered loading commences
  let morePages = true;

  const [cardData, setCardData] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    console.log(`CLEAR RESULTS?: ${clearResults}`);
    fetchCardData();
  }, []); // AHHHH, i missed the second argument and it was infinitely looping. Details :}

  const fetchCardData = (count = 20) => {

    console.log(`Before Query: ${query}`);
    
    query = `${apiRoot}?pageSize=${count}&page=${currentPage}&name=${searchTerms}`;
    
    console.log(`After Query: ${query}`);
    axios
      .get( query,{
        params: {
          pageSize: 20
        }
      })
      .then(response => {

        currentPage = currentPage + 1;

        setCardData([...cardData, ...response.data.cards]);
        setIsLoaded(true);
        
        // Keep an eye on how much junk we got! ;D
        console.log(`Current Page: ${currentPage}, Card Data: ${cardData.length}, More Pages: ${morePages}`);
        console.log(`New Data Length: ${cardData.length}`);
      })
      .catch(function (error) {
        console.log(`Server ERROR: ${error}`);
      })
      
  };

  const checkMorePages = () => {
    morePages = cardData.length < 1 ? false : true;
    // console.log(`BIKI AGIN: ${morePages}`);

    // When no terms are passed, this works
    // When terms are passed, this works
    // When impossible terms are passed, this works


    return morePages;
  }

  let biki;
  let bikiCount = 0;
  const renderGallery = () => {
    if (clearResults === true) {
      biki = `Silence is golden + ${bikiCount + 1}`;
      console.log(`render QUERY(clear): ${query}`);
    } else {
      console.log(`render QUERY(load): ${query}`);
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

    // console.log(biki);



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

          {/* SCROLL & LOAD */}
          {/* IF input, unmount InfiniteScroll, mount */}

          
        </div>
      </div>
    </div>
  );
};

export default Collage;
