import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {getAll, update} from './BooksAPI.js'

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

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false,  })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                 placeholder="Search by title or author"
                 onChange={(event) => this.updateShowSearchPage(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {showingBooks.map(book =>
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
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
