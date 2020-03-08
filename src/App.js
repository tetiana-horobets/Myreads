import React from 'react'
import './App.css'
import {getAll, update} from './BooksAPI.js'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Search from './Search';
import Book from './Book';
import Shelf from './Shelf';

class BooksApp extends React.Component {

    state = {
      showSearchPage: false,
      books: []
    }

    constructor(props) {
       super(props);

       getAll()
          .then(books => this.setState({books: books}));
    }

    updateShowSearchPage = (showSearchPage) => {
      this.setState(() => ({
        showSearchPage: showSearchPage.trim()
      }))
    }

    render() {
      const books = this.state.books;

      return (
        <BrowserRouter>
        <div className="app">
        {this.state.showSearchPage ? (

          <Route exact path="/search" component={() => <Search showSearchBooks={books}/>} />
        ) : (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      <Shelf
                        shelfBooks={books.filter(book => book.shelf === 'currentlyReading')}
                        shelfName={'Currently Reading'}
                      />
                      <Shelf
                        shelfBooks={books.filter(book => book.shelf === 'wantToRead')}
                        shelfName={'Want to Read'}
                      />
                      <Shelf
                        shelfBooks={books.filter(book => book.shelf === 'read')}
                        shelfName={'Read'}
                      />
                  </div>
                  <div className="open-search">
                    <Link to="/search"
                     onClick={() => this.setState({ showSearchPage: true })}>Search</Link>
                  </div>
                </div>
              )}
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
