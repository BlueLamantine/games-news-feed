import { getDateFromUnixTimestamp, gamesInfo, getNewsForGameUrl } from './utils';

window.dataStore = {
  currentGameId: null,
  selectedGames: {},
  isDataLoading: false,
  error: null,
  newsByGames: {},
};

window.renderNewsFeed = renderNewsFeed;
window.performRetrieve = performRetrieve;
window.loadData = loadData;
window.renderNews = renderNews;

renderApp();

function renderApp() {
  document.querySelector('#app-root').innerHTML = `
        <form id="games">${renderForm()}</form>
        <div id="feed"></div>
    `;
  renderNews();
}

function renderNews() {
  document.querySelector('#feed').innerHTML = getResults();
}

function renderForm() {
  return ` 
        <fieldset>
        <legend class="headline">Select games to track news</legend>
        ${gamesInfo.apps
          .map(
            ({ appid, name }) =>
              `<label for="${appid}">
                <input
                  type="checkbox"
                  id="${appid}"
                  class="main__checkbox"
                  name="${name}"
                  value="${appid}"
                  aria-label="csgo"
                />
                <span class="gaem__item">${name}</span>
              </label>`,
          )
          .join('')}
        </fieldset>
        `;
}

function isCurrentGameDataLoaded() {
  return Boolean(window.dataStore.newsByGames[window.dataStore.currentGameId]);
}

function loadData() {
  const url = getNewsForGameUrl(window.dataStore.currentGameId);

  if (!isCurrentGameDataLoaded(window.dataStore.currentGameId)) {
    return fetch(url)
      .then(response => response.json())
      .then(data => ({ data }));
  }

  return Promise.resolve({});
}

function performRetrieve(currentGame) {
  window.dataStore.currentGameId = currentGame.value;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;

  window
    .loadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.newsByGames[currentGame.value] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(() => {
      window.renderNews();
    });
}

function getResults() {
  const { currentGameId, isDataLoading, error } = window.dataStore;
  let content = '';
  if (currentGameId == null) {
    content = `<p>Select games to retrieve news for</p>`;
  } else {
    if (isDataLoading) {
      content = `<p>Loading...</p>`;
    }
    if (error !== null) {
      content = error;
    }
  }
  if (isCurrentGameDataLoaded()) {
    content = renderNewsFeed();
  }
  return content;
}

function createNewsItem(item) {
  const { date, title, contents } = item;
  return `
  <div>
    <h3 class="title">${title}</h3>
    <div>${getDateFromUnixTimestamp(date)}</div>
    <p class="content">${contents}</p>
  </div>`;
}
function renderNewsFeed() {
  let dataNews = [];

  Object.keys(window.dataStore.selectedGames).map(appid => {
    dataNews = [...dataNews, ...window.dataStore.newsByGames[appid].appnews.newsitems];
  });
  dataNews.sort((a, b) => (a.date < b.date ? 1 : -1));
  let content = '';
  dataNews.forEach(item => {
    content += createNewsItem(item);
  });
  return content;
}

trackGames();

function trackGames() {
  document.querySelector('#games').addEventListener('change', ({ target }) => {
    if (target.type === 'checkbox') {
      if (target.checked === true) {
        window.dataStore.selectedGames[target.value] = target.name;
        performRetrieve(target);
      } else {
        delete window.dataStore.selectedGames[target.value];
        window.renderNews();
      }
    }
  });
}
