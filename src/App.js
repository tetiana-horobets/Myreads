import React from 'react'
import './App.css'
import { BrowserRouter, Route } from "react-router-dom";
import Search from './Search';
import ShowBook from './ShowBook';

class BooksApp extends React.Component {

    render() {
      return (
        <BrowserRouter>
        <div className="app">
          <Route exact path="/search" component={() => <Search/>} />
          <Route exact path="/" component={() => <ShowBook/>} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
