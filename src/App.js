import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Package from './package/package';

import Login from './login/login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png" alt="main logo" class="center" />
      </header>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/package" exact component={Package} />
      </BrowserRouter>
    </div>
  );
}

export default App;
