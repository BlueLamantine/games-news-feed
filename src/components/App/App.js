import React from 'react';
import useDataNews from '../../customHooks';
import Games from '../Games';
import NewsResults from '../News';
import styles from './App.css';
import { GamesIdsContext, GamesInfoContext } from '../../context';
import Footer from './AppFooter.js';

export default function App() {
  const { setCurrentGameId, selectedGamesIDs, error, isLoading, newsByGames } = useDataNews();

  return (
    <>
      <div className={styles.container}>
        <GamesIdsContext.Provider value={selectedGamesIDs}>
          <div className={styles.sidebar}>
            <a className={styles.logo_expand} href="https://store.steampowered.com/news/">
              <img src="https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" />
            </a>
            <Games setCurrentGameId={setCurrentGameId} />
          </div>
          <div className={styles.wrapper}>
            {!selectedGamesIDs.length ? (
              <p className={styles.greeting}>Welcome to your personal game news aggregator!</p>
            ) : (
              <GamesInfoContext.Provider value={newsByGames}>
                <NewsResults isLoading={isLoading} error={error} />
              </GamesInfoContext.Provider>
            )}
          </div>
        </GamesIdsContext.Provider>
      </div>
      <Footer />
    </>
  );
}
