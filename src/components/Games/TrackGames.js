import renderApp from '../../framework/render';

export default function trackGames({ target }) {
  const id = target.id;
  if (window.dataStore.checkedGamesIDs.includes(id)) {
    window.dataStore.checkedGamesIDs = window.dataStore.checkedGamesIDs.filter(
      filterID => filterID !== id,
    );
  } else {
    window.dataStore.checkedGamesIDs = [...window.dataStore.checkedGamesIDs, id];
    window.dataStore.currentGameId = id;
  }
  renderApp();
}
