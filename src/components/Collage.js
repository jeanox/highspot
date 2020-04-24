import spinner from '../assets/images/load.gif';
import React, {useState} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';

// INIT variables/values
let searchTerms = '';
let currentPage = 1;
let clearResults = false;
let isSearch = false;
let loadMoreCards = true;

const apiRoot = "https://api.elderscrollslegends.io/v1/cards";
let query = apiRoot;

const Collage = () => {

  const [cardData, setCardData] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const groomSearchTerms = rawTerms => {
    // I started with this simplegrooming, but wanted something a bit beefier to handle multiple spaces and odd characters
    // searchTerms = rawTerms.split(' ').join(',');
    searchTerms = rawTerms.replace(/[^a-z]+/gi, ',');
  };
  
  // I wanted to debounce this; there are queries firing wayyyy too much.
  const onChange = e => {
    setSearchQuery(e.target.value);
    groomSearchTerms(e.target.value);

    // Set Query
    query = `${apiRoot}?pageSize=20&page=1&name=${searchTerms}`;
    
    // RESET Page
    currentPage = 1;

    // RESET Cards
    clearResults = true;

    // console.log(`onChange: searchTerms: ${e.target.value} | Card Data:${cardData} | Clear Results: ${clearResults}`);
    console.log(`onChangeQ: query: ${query}`);
    
    fetchCardData();

    // We have to know if it's a search interaction or passive one
    if (searchTerms.length > 0) {
      isSearch = true;
    } else {
      isSearch = false;
    }
    console.log(`IS SEARCH: ${isSearch}`)
  };

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

        // Track if a search is happening
        if (isSearch) {
          setCardData(response.data.cards);
          isSearch = false;
        } else {
          setCardData([...cardData, ...response.data.cards]);
        }

        setIsLoaded(true);

        if (response.data.cards.length === 20) {
          loadMoreCards = true;
        } else {
          loadMoreCards = false;
        }
        
        console.log(`CARDS LOADING: ${response.data.cards.length}`);
        console.log(`LOAD MORE?: ${loadMoreCards}`);
      })
      .catch(function (error) {
        console.log(`Server ERROR: ${error}`);
      })
      
  };

  let gallery =
    <InfiniteScroll
      dataLength={cardData}
      next={() => fetchCardData(20) } 
      hasMore={loadMoreCards}
      loader={
        <img
          src={spinner}
          alt="loading"
        />
      }
      endMessage={<p className="error" >No more results</p>}
    >
      <div className="gallery__grid">
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

  const renderGallery = () => {
    console.log(`LOAD MORE?: ${loadMoreCards}`)
    // This duplication serves to re-render the component in 2 instances
    if (clearResults === true) {
      return gallery;
    } else {
      return gallery;
    }
  }

  return (
    <div className="gallery__container">

      <label>Scroll to browse or type below to search for cards</label>
      <input
        type="text"
        value={searchQuery}
        placeholder="ex: Guard"
        onChange={onChange}
      />

      {renderGallery()}

    </div>
  );
};

export default Collage;
