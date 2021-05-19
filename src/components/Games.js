/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { gamesInfo } from '../data/SteamAPI';

function trackGames({ target }) {
  const id = target.id;
  if (window.dataStore.checkedGamesIDs.includes(id)) {
    window.dataStore.checkedGamesIDs = window.dataStore.checkedGamesIDs.filter(
      filterID => filterID !== id,
    );
  } else {
    window.dataStore.checkedGamesIDs = [...window.dataStore.checkedGamesIDs, id];
    window.dataStore.currentGameId = id;
  }
  window.renderApp();
}

export default function AvailableGames() {
  return (
    <form
      id="games"
      onChange={event => {
        trackGames(event);
        window.performRetrieve();
      }}
    >
      <fieldset class="allowed_games">
        <legend>Select games to track news</legend>
        {gamesInfo.apps.map(gameData => renderGameFilter(gameData))}
      </fieldset>
    </form>
  );
}

function renderGameFilter({ appid, name }) {
  return (
    <label For={appid}>
      <input
        type="checkbox"
        id={appid}
        name={name}
        value={appid}
        checked={window.dataStore.checkedGamesIDs.includes(appid.toString())}
      />
      <span>{name}</span>
    </label>
  );
}
