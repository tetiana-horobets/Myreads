import React from 'react'
import './App.css'
import {getAll, update} from './BooksAPI.js'
import { BrowserRouter, Route, Link } from "react-router-dom";

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
      const books = this.state.books
      const { showSearchPage } = this.state

      const showingBooks = showSearchPage === true
          ? books
          : books.filter((c) => (
              c.title.toString().toLowerCase().includes(showSearchPage.toString().toLowerCase())
            ))

      return (
        <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <div className="app">
              {this.state.showSearchPage ? (
                <div className="search-books">
                  <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false,  })}>Close</a>
                    <div className="search-books-input-wrapper">
                      <input type="text"
                       placeholder="Search by title or author"
                       onChange={(event) => this.updateShowSearchPage(event.target.value)}/>
                    </div>
                  </div>
                  <SearchBooksResults
                  showSearchBooks = {showingBooks}
                  />
                </div>
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
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                    <Link to="/search"
                    className='search-books'
                     onClick={() => this.setState({ showSearchPage: true })}>Search</Link>
                  </div>
                </div>
              )}
            </div>
          )}/>
        </div>
      </BrowserRouter>
      )
  }
}

class Book extends React.Component {

  updateShelf(shelf) {
    const {id} = this.props;
    update({id}, shelf)
      .then(() => console.log('update book'))
      .catch(() => console.error('could not update book'));
  }

  render() {
    const { cover = 0 } = this.props;
    return (
        <div>
          <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:cover}}></div>
                <div className="book-shelf-changer">
                  <select onChange={e => this.updateShelf(e.target.value)} value={this.props.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
    );
  }
}

class SearchBooksResults extends React.Component {

  render() {
    return (
        <div className="search-books-results">
          <ol className="books-grid">
          {this.props.showSearchBooks.map(book =>
              <Book
                id={book.id}
                shelf={book.shelf}
                title={book.title}
                authors={book.authors.join(', ')}
                cover={`url("${book.imageLinks.smallThumbnail}")`}
            />)}
          </ol>
        </div>
    );
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
