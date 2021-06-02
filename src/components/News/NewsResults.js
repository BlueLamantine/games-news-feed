/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../../framework';
import { Timestamp } from '../Timestamp/Timestamp';
import Search from '../Search/SearchByKeyword';
import NewsFeed from '../NewsFeed/NewsFeed';

export default function NewsResults({ isDataLoaded, selectedGamesIDs, error }) {
  const [currentTimestamp, setCurrentTimestamp] = useState('alltime');
  const [currentKeyword, setCurrentKeyword] = useState('');

  if (selectedGamesIDs.length == 0) {
    return <div>Welcome to your personal game news aggregator!</div>;
  } else {
    if (error) {
      return <div>error</div>;
    }

    if (!isDataLoaded) {
      return <div>Loading...Please, wait. It may takes more than 20 seconds for a first load</div>;
    } else {
      return (
        <>
          <Timestamp
            currentTimestamp={currentTimestamp}
            setCurrentTimestamp={setCurrentTimestamp}
          />
          <Search currentKeyword={currentKeyword} setCurrentKeyword={setCurrentKeyword} />
          <NewsFeed
            selectedGamesIDs={selectedGamesIDs}
            currentTimestamp={currentTimestamp}
            currentKeyword={currentKeyword}
          />
        </>
      );
    }
  }
}
