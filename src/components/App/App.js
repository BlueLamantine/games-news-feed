/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useDataNews } from '../../framework';
import AvailableGames from '../Games/Games';
import NewsResults from '../News/NewsResults';
import styles from './App.css';
import { AppContext, DataContext } from '../../context';

export default function App() {
  const { setCurrentGameId, selectedGamesIDs, error, isLoading, dataStorage } = useDataNews();

  return (
    <>
      <header className={styles.main_header}></header>
      <AppContext.Provider value={selectedGamesIDs}>
        <AvailableGames setCurrentGameId={setCurrentGameId} />
        {selectedGamesIDs.length == 0 ? (
          <div>Welcome to your personal game news aggregator!</div>
        ) : (
          <DataContext.Provider value={dataStorage}>
            <NewsResults isLoading={isLoading} error={error} />
          </DataContext.Provider>
        )}
      </AppContext.Provider>
    </>
  );
}
