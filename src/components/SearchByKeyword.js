/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import renderApp from '../framework/render';

const setCurrentKeyword = function (value) {
  window.dataStore.keyword = value;
  window.renderApp();
};

export default function Search() {
  return (
    <div>
      <p>Input KEYWORD and press enter</p>
      <input
        type="text"
        id="search-input"
        placeholder="search"
        value={window.dataStore.keyword}
        onChange={event => setCurrentKeyword(event.target.value)}
      />
      <button type="button" onClick={event => renderApp()}>
        Search
      </button>
    </div>
  );
}
