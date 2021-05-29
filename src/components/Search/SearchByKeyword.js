/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, render } from '../../framework';

export default function Search({ currentKeyword, setCurrentKeyword }) {
  return (
    <div>
      <p>Input KEYWORD and press enter</p>
      <input
        type="text"
        id="search-input"
        placeholder="search"
        value={currentKeyword}
        onChange={event => setCurrentKeyword(event.target.value)}
      />
      <button type="button" onClick={event => render()}>
        Search
      </button>
    </div>
  );
}
