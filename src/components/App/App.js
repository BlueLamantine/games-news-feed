/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import AvailableGames from '../Games/Games';
import NewsResults from '../News/NewsResults';
import styles from './App.css';

export default function App() {
  return (
    <>
      <header className={styles.main_header}></header>
      <AvailableGames />
      <NewsResults />
    </>
  );
}
