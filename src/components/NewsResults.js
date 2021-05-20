/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import renderApp from '../framework/render';
import { Timestamps } from './Timestamps';
import Search from './SearchByKeyword';
import NewsFeed from './NewsFeed';
import isCurrentGameDataLoaded from '../data/newsData';

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
        <Timestamps
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
