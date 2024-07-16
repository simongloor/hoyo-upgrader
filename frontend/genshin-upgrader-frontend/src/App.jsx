/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import artifacts from './data/mock/artifacts.json';
import './styles/App.scss';

function App() {
  console.log(artifacts);

  // render
  return (
    <div className="App">
      <a href="https://artiscan.ninjabay.org/#/artifacts/help" target="_blank" rel="noopener noreferrer">
        Screengrab tool
      </a>
    </div>
  );
}

export default App;
