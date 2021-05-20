/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import AvailableGames from '../Games/Games';
import NewsResults from '../News/NewsResults';

export default function App() {
  return (
    <>
      <AvailableGames />
      <NewsResults />
    </>
  );
}
