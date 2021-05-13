import { getDateFromUnixTimestamp, gamesInfo, getNewsForGameUrl, herokuURL } from './utils';
import styles from './styles.css';

window.dataStore = {
  checkedGamesIDs: [],
  currentGameId: '',
  isDataLoading: false,
  error: null,
  newsByGames: {},
};

window.renderApp = renderApp;
window.renderNewsFeed = renderNewsFeed;
window.performRetrieve = performRetrieve;
window.loadData = loadData;
window.renderNews = renderNews;

function renderForm() {
  return `
  <form id="games" onchange="window.trackGames(event); window.performRetrieve()">
  <fieldset class="allowed_games">
        <legend class="headline">Select games to track news</legend>
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
window.trackGames = trackGames;

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

renderApp();

function renderApp() {
  document.querySelector('#app-root').innerHTML = `${App()}`;
}

function App() {
  return `<div>
  ${renderForm()}
  ${getResults()}
  </div> `;
}

function renderNews() {
  document.querySelector('#feed').innerHTML = getResults();
}

function isCurrentGameDataLoaded() {
  return Boolean(window.dataStore.newsByGames[window.dataStore.currentGameId]);
}

function loadData() {
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

function performRetrieve() {
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;

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
    .finally(() => {
      window.renderApp();
    });
}

function getResults() {
  const { checkedGamesIDs, isDataLoading, error } = window.dataStore;
  let content = '';

  if (isCurrentGameDataLoaded()) {
    content = `
    <div class="${styles.news_feed}">${renderNewsFeed()}</div>
    `;
  }

  if (checkedGamesIDs.length == 0) {
    content = `<p>Select games to retrieve news for</p>`;
  } else {
    if (isDataLoading) {
      content = `<p>Loading...</p>`;
    }
    if (error !== null) {
      content = error;
    }
  }

  return content;
}

function createNewsItem({ date, title, contents }) {
  return `
  <div class="${styles.news_item}">
    <h3 class="title">${title}</h3>
    <div>${getDateFromUnixTimestamp(date)}</div>
    <p class="content">${contents}</p>
  </div>`;
}
function renderNewsFeed() {
  let dataNews = [];

  window.dataStore.checkedGamesIDs.map(appid => {
    dataNews = [...dataNews, ...window.dataStore.newsByGames[appid].appnews.newsitems];
  });
  dataNews.sort((a, b) => (a.date < b.date ? 1 : -1));
  let content = '';
  dataNews.forEach(item => {
    content += createNewsItem(item);
  });
  return content;
}
