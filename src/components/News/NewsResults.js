/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, render } from '../../framework';
import { Timestamp } from '../Timestamp/Timestamp';
import Search from '../Search/SearchByKeyword';
import NewsFeed from '../NewsFeed/NewsFeed';
import { AppContext, DataContext } from '../../context';
import { useAppContext, useDataContext } from '../../context';

export default function NewsResults({ isLoading, error, dataStorage }) {
  const [currentTimestamp, setCurrentTimestamp] = useState('alltime');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const selectedGamesIDs = useDataContext();
  if (Array.from(selectedGamesIDs).length == 0) {
    return <div>Welcome to your personal game news aggregator!</div>;
  } else {
    if (error) {
      return <div>error</div>;
    }

    if (isLoading) {
      return <div>Loading...Please, wait. It may takes more than 20 seconds for a first load</div>;
    }

    return (
      <>
        <Timestamp currentTimestamp={currentTimestamp} setCurrentTimestamp={setCurrentTimestamp} />
        <Search currentKeyword={currentKeyword} setCurrentKeyword={setCurrentKeyword} />
        <AppContext.Provider value={dataStorage}>
          <NewsFeed
            // selectedGamesIDs={selectedGamesIDs}
            currentTimestamp={currentTimestamp}
            currentKeyword={currentKeyword}
          />
        </AppContext.Provider>
      </>
    );
  }
}
