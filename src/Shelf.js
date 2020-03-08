import React from 'react';
import Book from './Book';

class Shelf extends React.Component{
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.shelfBooks.map(book =>
              <Book
                key={book.id}
                id={book.id}
                shelf={book.shelf}
                title={book.title}
                authors={book.authors.join(', ')}
                cover={`url("${book.imageLinks.smallThumbnail}")`}
                onBookUpdate={this.props.onBookUpdate}
            />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf
