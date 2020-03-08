import React from 'react';
import Book from './Book';

class Search extends React.Component {

  state = {
    showSearchPage: true,
  }

  updateShowSearchPage = (showSearchPage) => {
    this.setState(() => ({
      showSearchPage: showSearchPage.trim()
    }))
  }

  render() {

    const books = this.props.showSearchBooks;
    const { showSearchPage } = this.state

    const showingBooks = showSearchPage === true
        ? books
        : books.filter((c) => (
            c.title.toString().toLowerCase().includes(showSearchPage.toString().toLowerCase())
          ))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
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
    )
  }
}
export default Search
