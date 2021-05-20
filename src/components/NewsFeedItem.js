/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { getDateFromUnixTimestamp } from '../utils';
import renderApp from '../framework/render';

function setTag(value) {
  if (window.dataStore.tag !== null) {
    window.dataStore.tag = null;
  } else {
    window.dataStore.tag = value;
  }

  renderApp();
}

function prepareData(data) {
  const parser = new DOMParser();
  const toHTML = parser.parseFromString(data, 'text/html');
  const content = toHTML.body.childNodes;
  const div = document.createElement('div');
  Array.from(content).forEach(el => div.appendChild(el));
  return div;
}

export default function NewsItem({ itemData }) {
  const { date, title, contents, feedlabel } = itemData;
  return (
    <>
      <h3 class="title">{title}</h3>
      <div>{feedlabel}</div>
      <div>{getDateFromUnixTimestamp(date)}</div>
      <p>{prepareData(contents)}</p>
      <div>
        {' '}
        All news with tag
        <label For={feedlabel}>
          <input
            type="checkbox"
            id={feedlabel}
            name="tag"
            value={feedlabel}
            checked={window.dataStore.tag == feedlabel}
            onChange={event => setTag(event.target.value)}
          />
          <span>{feedlabel}</span>
        </label>
      </div>
    </>
  );
}
