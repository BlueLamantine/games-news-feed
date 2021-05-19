import { renderTimestamps } from './Timestamps';
import { renderSearch } from './SearchByKeyword';
import { renderNewsFeed } from './NewsFeed';
import isCurrentGameDataLoaded from '../data/newsData';

const setCurrentTimestamp = function (value) {
  window.dataStore.currentTimestamp = value;
  window.renderApp();
};

export default function getResults() {
  const { checkedGamesIDs, isDataLoading, error, currentTimestamp } = window.dataStore;
  let content = '<div></div>';

  if (checkedGamesIDs.length == 0) {
    content = `<p>
    Welcome to your personal game news aggregator!</p>`;
  } else {
    if (isDataLoading) {
      content = `<p>Loading...Please, wait. It may takes more than <b>20 seconds</b> for a first load</p>`;
    }
    if (error !== null) {
      content = error;
    }
  }

  if (isCurrentGameDataLoaded() && checkedGamesIDs.length !== 0) {
    content = `
        ${renderTimestamps(currentTimestamp, setCurrentTimestamp)}
        ${renderSearch()}
        ${renderNewsFeed()}
      `;
  }

  return content;
}
