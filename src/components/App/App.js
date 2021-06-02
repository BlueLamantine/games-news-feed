/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useDataNews } from '../../framework';
import { useEffect, useState } from '../../framework';
import AvailableGames from '../Games/Games';
import NewsResults from '../News/NewsResults';
import styles from './App.css';
import { AppContext } from '../../context';

export default function App() {
  const {
    setCurrentGameId,
    selectedGamesIDs,
    setSelectedGamesIDs,
    error,
    isDataLoaded,
    dataStorage,
  } = useDataNews();

  const allData = {
    dataStorage,
    selectedGamesIDs,
  };

  return (
    <>
      <header className={styles.main_header}></header>
      <AppContext.Provider value={allData}>
        <AvailableGames
          setCurrentGameId={setCurrentGameId}
          //selectedGamesIDs={selectedGamesIDs}
          setSelectedGamesIDs={setSelectedGamesIDs}
        />

        <NewsResults
          isDataLoaded={isDataLoaded}
          //selectedGamesIDs={selectedGamesIDs}
          error={error}
        />
      </AppContext.Provider>
    </>
  );
}
