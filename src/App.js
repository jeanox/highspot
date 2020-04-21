import React from 'react';
import './App.scss';
import Collage from './components/Collage';

function App() {
  return (
    <div className="App">
      <div className="header content">
        <h1 className="title">
          Highspot Fun Nerdy Data Times
        </h1>
        <h2 className="subtitle">I am a cheeky devil</h2>
      </div>

      <Collage />

    </div>
  );
}

export default App;
