import React from 'react';
import {update} from './BooksAPI.js'

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
export default Book
