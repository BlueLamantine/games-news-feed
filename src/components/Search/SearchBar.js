import React from 'react';
import styles from './SearchBar.css';

export default function Search({ value, handleSearch, currentTag }) {
  let input = React.createRef();
  return (
    <>
      <div className={styles.search_bar}>
        <input
          type="text"
          id="search-input"
          placeholder="Search by keyword"
          defaultValue={value}
          ref={input}
          onBlur={event => handleSearch(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearch(event.target.value);
            }
          }}
          disabled={currentTag != null || false}
        />
      </div>
    </>
  );
}
