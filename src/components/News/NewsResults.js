/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import renderApp from '../../framework/render';
import { Timestamp } from '../Timestamp/Timestamp';
import Search from '../Search/SearchByKeyword';
import NewsFeed from '../NewsFeed/NewsFeed';
import isCurrentGameDataLoaded from '../../data/newsData';

const setCurrentTimestamp = function (value) {
  window.dataStore.currentTimestamp = value;
  renderApp();
};

export default function NewsResults() {
  const { checkedGamesIDs, isDataLoading, error, currentTimestamp } = window.dataStore;
  let content = '';

  if (checkedGamesIDs.length == 0) {
    content = `Welcome to your personal game news aggregator!`;
  } else {
    if (isDataLoading) {
      content = `Loading...Please, wait. It may takes more than 20 seconds for a first load`;
    }
    if (error !== null) {
      content = error;
    }
  }

  if (isCurrentGameDataLoaded() && checkedGamesIDs.length !== 0) {
    content = (
      <>
        <Timestamp
          currentTimestamp={currentTimestamp}
          setCurrentTimestampCB={setCurrentTimestamp}
        />
        <Search />
        <NewsFeed />
      </>
    );
  }

  return <div>{content}</div>;
}
