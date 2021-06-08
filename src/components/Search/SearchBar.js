/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, render } from '../../framework';
import styles from './SearchBar.css';

export default function Search({ currentKeyword, setCurrentKeyword }) {
  return (
    <div class={styles.search_bar}>
      <input
        type="text"
        id="search-input"
        placeholder="Search by keyword"
        value={currentKeyword}
        onChange={event => setCurrentKeyword(event.target.value)}
      />
      <button type="button" class={styles.search_btn} onClick={event => render()}></button>
    </div>
  );
}
