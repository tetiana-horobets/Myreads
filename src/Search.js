import React from 'react';
import Book from './Book';

class Search extends React.Component {

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input type="text"
             placeholder="Search by title or author"
            />
          </div>
        </div>
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
      </div>
    )
  }
}
export default Search
