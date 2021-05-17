import {
  getDateFromUnixTimestamp,
  gamesInfo,
  getNewsForGameUrl,
  herokuURL,
  sortDataByNewest,
  ALLNEWS,
  timestamps,
  getStartDate,
  getMonthOfDate,
  getYearOfDate,
} from './utils';
import styles from './styles.css';

window.dataStore = {
  checkedGamesIDs: [],
  currentGameId: '',
  isDataLoading: false,
  error: null,
  newsByGames: {},
  currentTimestamp: ALLNEWS,
  currentDate: Math.floor(Date.now() / 1000),
};

window.renderApp = renderApp;
window.renderNewsFeed = renderNewsFeed;
window.performRetrieve = performRetrieve;
window.loadData = loadData;

function renderForm() {
  return `
  <form id="games" onchange="window.trackGames(event); window.performRetrieve()">
  <fieldset class="allowed_games">
        <legend class="${styles.headline}">Select games to track news</legend>
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
    .finally(window.renderApp);
}

function getResults() {
  const { checkedGamesIDs, isDataLoading, error, currentTimestamp } = window.dataStore;
  let content = '';

  if (checkedGamesIDs.length == 0) {
    content = `<p class="${styles.greeting}">
    Welcome to your personal game news aggregator!</p>`;
  } else {
    if (isDataLoading) {
      content = `<p>Loading...</p>`;
    }
    if (error !== null) {
      content = error;
    }
  }

  if (isCurrentGameDataLoaded()) {
    content = `
        ${timestampsSwitch(currentTimestamp)}
        ${renderNewsFeed()}
      `;
  }

  return content;
}

function timestampsSwitch(currentTimestamp) {
  return `
  <fieldset>
  <legend>Timestamps</legend>
  <select onchange="(${setCurrentTimestamp})(this.value);">
${timestamps
  .map(
    ({ id, value, name }) =>
      `
      <option  
          id="${id}" 
          name="timestamp-option"
          value="${value}"
          ${currentTimestamp === value ? ' selected ' : ''}
          >${name}</option>
 
  `,
  )
  .join('')}
  </select>
 </fieldset>`;
}

const setCurrentTimestamp = function (value) {
  window.dataStore.currentTimestamp = value;
  window.renderApp();
};

function createNewsItem({ date, title, contents }) {
  return `
  <div class="${styles.news_item}">
    <h3 class="title">${title}</h3>
    <div>${getDateFromUnixTimestamp(date)}</div>
    <p class="content">${contents}</p>
  </div>`;
}

function filterDataByTimestamp(data, currentDate, currentTimestamp) {
  const dataByTimestamp = {
    today: () => {
      return data.filter(
        newsItem =>
          getDateFromUnixTimestamp(newsItem.date) == getDateFromUnixTimestamp(currentDate),
      );
    },
    week: () => {
      return data.filter(newsItem => newsItem.date > getStartDate());
    },
    month: () => {
      return data.filter(
        newsItem =>
          getYearOfDate(newsItem.date) == getYearOfDate(currentDate) &&
          getMonthOfDate(newsItem.date) == getMonthOfDate(currentDate),
      );
    },
    alltime: () => {
      return data;
    },
  };
  return dataByTimestamp[currentTimestamp]();
}

function renderNewsFeed() {
  let dataNewsContainer = [];

  window.dataStore.checkedGamesIDs.map(appid => {
    dataNewsContainer = [
      ...dataNewsContainer,
      ...window.dataStore.newsByGames[appid].appnews.newsitems,
    ];
  });
  const news = filterDataByTimestamp(
    dataNewsContainer,
    window.dataStore.currentDate,
    window.dataStore.currentTimestamp,
  );
  let content = '';
  sortDataByNewest(news).forEach(item => {
    content += createNewsItem(item);
  });
  return `
  <div class="${styles.news_feed}"> ${content} </div>
  `;
}
