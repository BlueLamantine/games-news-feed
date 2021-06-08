/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useDataNews } from '../../framework';
import Games from '../Games';
import NewsResults from '../News';
import styles from './App.css';
import { AppContext, DataContext } from '../../context';
import Footer from './AppFooter.js';

export default function App() {
  const { setCurrentGameId, selectedGamesIDs, error, isLoading, dataStorage } = useDataNews();

  return (
    <>
      <div class={styles.container}>
        <AppContext.Provider value={selectedGamesIDs}>
          <div class={styles.sidebar}>
            <a class={styles.logo_expand} href="https://store.steampowered.com/news/">
              <img src="https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" />
            </a>
            <Games setCurrentGameId={setCurrentGameId} />
          </div>
          <div class={styles.wrapper}>
            {selectedGamesIDs.length == 0 ? (
              <p class={styles.greeting}>Welcome to your personal game news aggregator!</p>
            ) : (
              <DataContext.Provider value={dataStorage}>
                <NewsResults isLoading={isLoading} error={error} />
              </DataContext.Provider>
            )}
          </div>
        </AppContext.Provider>
      </div>
      <Footer />
    </>
  );
}
