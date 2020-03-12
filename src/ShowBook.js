import React from 'react';
import {getAll} from './BooksAPI.js'
import Shelf from './Shelf';
import { Link } from "react-router-dom";

class ShowBook extends React.Component {

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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf
              shelfBooks={books.filter(book => book.shelf === 'currentlyReading')}
              shelfName={'Currently Reading'}
              onBookUpdate={() => this.loadBooks()}
            />
            <Shelf
              shelfBooks={books.filter(book => book.shelf === 'wantToRead')}
              shelfName={'Want to Read'}
              onBookUpdate={() => this.loadBooks()}
            />
            <Shelf
              shelfBooks={books.filter(book => book.shelf === 'read')}
              shelfName={'Read'}
              onBookUpdate={() => this.loadBooks()}
            />
        </div>
        <div className="open-search">
          <Link to="/search"
           onClick={() => this.setState({ showSearchPage: true })}>Search</Link>
        </div>
      </div>
    );
  }
}
export default ShowBook
