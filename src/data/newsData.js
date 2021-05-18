import { getNewsForGameUrl, herokuURL } from './SteamAPI';

export default function isCurrentGameDataLoaded() {
  return Boolean(window.dataStore.newsByGames[window.dataStore.currentGameId]);
}

export function loadData() {
  const sourceURL = getNewsForGameUrl(window.dataStore.currentGameId);

  if (!isCurrentGameDataLoaded()) {
    return fetch(herokuURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: sourceURL }),
    })
      .then(response => response.json())
      .then(data => ({ data }));
  }

  return Promise.resolve({});
}

export function performRetrieve() {
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;
  window.renderApp();
  window
    .loadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.newsByGames[window.dataStore.currentGameId] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(window.renderApp);
}
