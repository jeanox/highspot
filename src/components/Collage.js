import React, { useState } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchTerms } from './Search';

console.log(`IN SEARCH OF BIKI: ${searchTerms}`); // RETURNS A THING!

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

// DISLIKE SCOPE; if it's nested in Collage, though, it doesn't iterate properly
let currentPage = 1;

const Collage = () => {
  // We're going to load things in batches (pages), which means we'll need to increment with each call
  // initially set it to true so that the first call gets fired before scroll-triggered loading commences
  let morePages = true;

  const [cardData, setCardData] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchCardData();
  }, []); // AHHHH, i missed the second argument and it was infinitely looping. Details :}

  // console.log(`BIKI TERMS: ${searchTerms}`);

  const fetchCardData = (count = 20) => {
    const apiRoot = "https://api.elderscrollslegends.io/v1/cards";

    console.log(`THE FINAL QUERY: ${apiRoot}?pageSize=${count}&page=${currentPage}&name=`);//${searchTerms}

    axios
      .get(`${apiRoot}?pageSize=${count}&page=${currentPage}&name=${searchTerms}`,{//
        params: {
          pageSize: 20
        }
      })
      .then(res => {

        currentPage = currentPage + 1;
        setCardData([...cardData, ...res.data.cards]);
        setIsLoaded(true);
        
        // Keep an eye on how much junk we got! ;D
        // console.log(JSON.stringify(res.data.cards));
        console.log(`Current Page: ${currentPage}, Card Data: ${cardData.length}, More Pages: ${morePages}`);
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


  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">

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
        </div>
      </div>
    </div>
  );
};

export default Collage;
