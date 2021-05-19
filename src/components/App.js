/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import AvailableGames from './Games';
import NewsResults from './NewsResults';

function App() {
  return (
    <>
      <AvailableGames />
      <NewsResults />
    </>
  );
}
export default App;
