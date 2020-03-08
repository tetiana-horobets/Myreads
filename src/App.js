import React from 'react'
import './App.css'
import {getAll} from './BooksAPI.js'
import { BrowserRouter, Route } from "react-router-dom";
import Search from './Search';
import ShowBook from './ShowBook';

class BooksApp extends React.Component {

    state = {
      books: []
    }

    constructor(props) {
       super(props);

       this.loadBooks();
    }

    loadBooks() {
      getAll()
         .then(books => this.setState({books: books}));
    }

    render() {
      const books = this.state.books;

      return (
        <BrowserRouter>
        <div className="app">
          <Route exact path="/search" component={() => <Search
            books={books}
            />} />
          <Route exact path="/" component={() => <ShowBook
            books={books}
            onBookUpdate={() => this.loadBooks()}
          />} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
