import React from 'react';
import Book from './Book';

class Search extends React.Component {

  state = {
    searchTerm: ''
  }

  updateSearchTerm(searchTerm) {
    this.setState(() => ({
      searchTerm: searchTerm.trim()
    }))
  }

  bookMatches(book, searchTerm) {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authors.filter(author => author.toLowerCase().includes(searchTerm.toLowerCase())).length > 0
  }

  getSearchResults() {
    const {books} = this.props;
    const {searchTerm} = this.state;

    if (searchTerm.length > 0) {
      return books.filter(book => this.bookMatches(book, searchTerm));
    }

    return [];
  }

  render() {
    const searchResults = this.getSearchResults();

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
          {searchResults.map(book =>
              <Book
                key={book.id}
                id={book.id}
                shelf={book.shelf}
                title={book.title}
                authors={book.authors.join(', ')}
                cover={`url("${book.imageLinks.smallThumbnail}")`}
                onBookUpdate={() => {}}
            />)}
          </ol>
        </div>
      </div>
    )
  }
}
export default Search
