import React from 'react';
import Shelf from './Shelf';
import { Link } from "react-router-dom";

class ShowBook extends React.Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf
              shelfBooks={this.props.books.filter(book => book.shelf === 'currentlyReading')}
              shelfName={'Currently Reading'}
              onBookUpdate={this.props.onBookUpdate}
            />
            <Shelf
              shelfBooks={this.props.books.filter(book => book.shelf === 'wantToRead')}
              shelfName={'Want to Read'}
              onBookUpdate={this.props.onBookUpdate}
            />
            <Shelf
              shelfBooks={this.props.books.filter(book => book.shelf === 'read')}
              shelfName={'Read'}
              onBookUpdate={this.props.onBookUpdate}
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
