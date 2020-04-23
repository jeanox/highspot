import React from 'react';
import './App.scss';
import Collage from './components/Collage';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="header--title">Elder Scrolls Legends ala React.js</h1>
        <h2 className="header--subtitle">Scroll to browse or search for specific cards</h2>
      </div>

      <Collage />

    </div>
  );
}

export default App;
