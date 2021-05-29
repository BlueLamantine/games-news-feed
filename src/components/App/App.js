/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useDataNews } from '../../framework';

import AvailableGames from '../Games/Games';
import NewsResults from '../News/NewsResults';
import styles from './App.css';

export default function App() {
  const {
    currentGameId,
    setCurrentGameId,
    selectedGamesIDs,
    setSelectedGamesIDs,
    error,
    isDataLoaded,
    dataStorage,
  } = useDataNews();

  return (
    <>
      <header className={styles.main_header}></header>
      <AvailableGames
        setCurrentGameId={setCurrentGameId}
        selectedGamesIDs={selectedGamesIDs}
        setSelectedGamesIDs={setSelectedGamesIDs}
      />
      <NewsResults
        isDataLoaded={isDataLoaded}
        selectedGamesIDs={selectedGamesIDs}
        error={error}
        dataStorage={dataStorage}
        currentGameId={currentGameId}
      />
    </>
  );
}
