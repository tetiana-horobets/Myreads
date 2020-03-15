import React from 'react';
import Book from './Book';
import {search} from './BooksAPI.js'


class Search extends React.Component {

  state = {
    books: []
  }

  updateSearchTerm(searchTerm) {
    console.log('updating seach term', searchTerm);
    if (searchTerm) {
      console.log('searching...');
      search(searchTerm)
         .then(books => {
           if (!books.error) {
             this.setState({books: books});
           } else {
             this.setState({books: []});
           }
         });
    }
  }

  constructor(props) {
     super(props);
  }

  render() {
    const books = this.state.books;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input type="text"
             placeholder="Search by title or author"
            onChange={(event) => this.updateSearchTerm(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {books.map(book =>
              <Book
                key={book.id}
                id={book.id}
                shelf={book.shelf}
                title={book.title}
                authors={book.authors && book.authors.join(', ')}
                cover={book.imageLinks && `url("${book.imageLinks.smallThumbnail}")`}
                onBookUpdate={() => {}}
            />)}
          </ol>
        </div>
      </div>
    )
  }
}
export default Search
