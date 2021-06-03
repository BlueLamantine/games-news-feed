/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useApp } from '../../framework';
import { useEffect, useState } from '../../framework';
import AvailableGames from '../Games/Games';
import NewsResults from '../News/NewsResults';
import styles from './App.css';
import { AppContext, DataContext } from '../../context';

export default function App() {
  const {
    currentGameId,
    setCurrentGameId,
    selectedGamesIDs,
    setSelectedGamesIDs,
    error,
    isLoading,
    dataStorage,
    cached,
  } = useApp();

  return (
    <>
      <header className={styles.main_header}></header>
      <DataContext.Provider value={selectedGamesIDs}>
        <AvailableGames
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          // selectedGamesIDs={selectedGamesIDs}
          setSelectedGamesIDs={setSelectedGamesIDs}
        />
        <NewsResults
          isLoading={isLoading}
          //selectedGamesIDs={selectedGamesIDs}
          error={error}
          dataStorage={dataStorage}
        />
      </DataContext.Provider>
    </>
  );
}
