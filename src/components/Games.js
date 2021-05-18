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

export default function getAvailableGames() {
  return `
    <form id="games" onchange="(${trackGames})(event); window.performRetrieve()">
    <fieldset class="allowed_games">
          <legend>Select games to track news</legend>
          ${gamesInfo.apps.map(gameData => renderGameFilter(gameData)).join('')}
      </fieldset>
    </form>
    `;
}

function renderGameFilter({ appid, name }) {
  return `<label for="${appid}">
    <input
      type="checkbox"
      id="${appid}"
      class="main__checkbox"
      name="${name}"
      value="${appid}"
      ${window.dataStore.checkedGamesIDs.includes(appid.toString()) ? 'checked' : ''} 
    />
    <span class="game_name">${name}</span>
  </label>`;
}
