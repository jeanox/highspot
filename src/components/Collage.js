import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

// I feel like this could be busted out to a nested component structure
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




// We're going to load things in batches (pages), which means we'll need to increment with each call
let currentPage = 0;
// initially set it to false in case the query is "squidward" or something random
let morePages = true;



// Search within TEXT and NAME because both are things users would care about
// Handle multiple words
// text=guard|prophecy&name=guard|prophecy
const searchTerms = 'skeletor';

let Collage = () => {
  const [cardData, setCardData] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchCardData();
  }, []); // AHHHH, i missed the second argument and it was infinitely looping. Details :}

  const fetchCardData = (count = 20) => {
    const apiRoot = "https://api.elderscrollslegends.io/v1/cards";

    axios
      .get(`${apiRoot}?pageSize=${count}&page=${currentPage}&name=${searchTerms}`,{
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
          <div className="header content">
            <h1 className="title">
              Highspot Fun Nerdy Data Times
            </h1>
            <h2 className="subtitle">I am a cheeky devil</h2>
          </div>

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

/*
// Memory leak happens if you don't cancel stuff
var CancelToken = axios.CancelToken;
var cancel;

cancelToken: new CancelToken(function executor(c) {
// An executor function receives a cancel function as a parameter
cancel = c;
}),

.catch(err => {

if(axios.isCancel(err)){

console.log(`im canceled ${err}`);

}
else{

console.log('im server response error');

}

});
// cancel();

// ReactDOM.render(<Collage />, document.getElementById("root"));
*/
