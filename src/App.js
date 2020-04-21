import React from 'react';
import './App.scss';
import Collage from './components/Collage';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <div className="header content">
        <h1 className="title">
          Highspot Fun Nerdy Data Times
        </h1>
        <h2 className="subtitle">I am a cheeky devil</h2>
      </div>

      <Search/>
      <Collage />

    </div>
  );
}

export default App;
