import React from 'react'
import './App.css'
import {getAll, update} from './BooksAPI.js'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Search from './Search';
import Book from './Book';


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
      const { showSearchPage } = this.state

      const showingBooks = showSearchPage === true
          ? books
          : books.filter((c) => (
              c.title.toString().toLowerCase().includes(showSearchPage.toString().toLowerCase())
            ))

      return (
        <BrowserRouter>
        <div className="app">
          <Route exact path="/search" component={() => <Search showSearchBooks={showingBooks}/>} />
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
        </div>
      </BrowserRouter>
    )
  }
}

class Shelf extends React.Component{
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.shelfBooks.map(book =>
              <Book
                id={book.id}
                shelf={book.shelf}
                title={book.title}
                authors={book.authors.join(', ')}
                cover={`url("${book.imageLinks.smallThumbnail}")`}
            />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksApp

{/*
  <Route exact path="/" render={() => (
    <Link
    to='/search'
    className='search'
    >Search</Link>

*/}
