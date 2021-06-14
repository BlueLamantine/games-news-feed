import React from 'react';
import styles from './SearchBar.css';

export default function Search({ value, handleSearch, currentTag }) {
  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        autoComplete="off"
        id="search-input"
        placeholder="Search by keyword"
        defaultValue={value}
        onBlur={event => handleSearch(event.target.value)}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            handleSearch(event.target.value);
          }
        }}
      />
    </div>
  );
}
