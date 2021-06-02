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

  return (
    <>
      <header className={styles.main_header}></header>
      <AvailableGames
        setCurrentGameId={setCurrentGameId}
        selectedGamesIDs={selectedGamesIDs}
        setSelectedGamesIDs={setSelectedGamesIDs}
      />
      <AppContext.Provider value={dataStorage}>
        <NewsResults
          isDataLoaded={isDataLoaded}
          selectedGamesIDs={selectedGamesIDs}
          error={error}
        />
      </AppContext.Provider>
    </>
  );
}
