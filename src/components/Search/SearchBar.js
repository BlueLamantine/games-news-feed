import React from 'react';
import styles from './SearchBar.css';

export default function Search({ value, onBlur }) {
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
          onBlur={event => onBlur(event.target.value)}
        />
        <button type="submit" className={styles.search_btn}></button>
      </div>
    </>
  );
}
