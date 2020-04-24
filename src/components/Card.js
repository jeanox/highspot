import React from "react";

const Card = ({ aKey, url, title, copy, set, type }) => (
  <div className="card" key={aKey} >
    <div className="card__image">
      <img src={url} alt={title}/>
    </div>
    <div className="card__copy">
      <p className={`card__title ${type.replace(/\s+/g, '-').toLowerCase()}`}>{title}</p>
      <div className="card__meta">
        <p className="">{set}</p>
        <p className="">{type}</p>
      </div>
      
      {/* This should account for multiple paragraphs later */}
      <p className="card__text">{copy}</p> 
    </div>
  </div>
);

export default Card;
