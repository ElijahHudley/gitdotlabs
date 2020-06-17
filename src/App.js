import React from 'react';
import logo from './assets/images/GitHub_Logo_White.png';

import { Search } from './Search/';
import './App.css';

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Search />
    </div>
  );
}

export default App;
