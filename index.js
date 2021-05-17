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
  currentDate,
} from './utils';
import styles from './styles.css';

window.dataStore = {
  checkedGamesIDs: [],
  currentGameId: '',
  isDataLoading: false,
  error: null,
  newsByGames: {},
  currentTimestamp: ALLNEWS,
  tag: null,
  filteredNews: null,
  keyword: '',
};

window.renderApp = renderApp;
window.renderNewsFeed = renderNewsFeed;
window.performRetrieve = performRetrieve;
window.loadData = loadData;
window.clearInput = clearInput;
window.searchByKeyword = searchByKeyword;

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

  if (isCurrentGameDataLoaded() && checkedGamesIDs.length !== 0) {
    content = `
        ${renderTimestamps(currentTimestamp)}
        ${renderSearch()}
        ${renderNewsFeed()}
      `;
  }

  return content;
}

function renderSearch() {
  return `
  <div>
  <p>Input KEYWORD and press enter</p>
  <input
      type="text"
      value="${window.dataStore.keyword}"
      onchange="window.searchByKeyword(this.value);" 
  />
  <button 
    type="button"
    onclick="window.clearInput()"
    >Clear</button>
  </div>
`;
}

function clearInput() {
  window.dataStore.keyword = '';
  window.renderApp();
}

function searchByKeyword(value) {
  window.dataStore.keyword = value;
  window.renderApp();
}

function renderTimestamps(currentTimestamp) {
  return `
  <div>
  <legend>Timestamps</legend>
  <select id="selectTimestamp" onchange="(${setCurrentTimestamp})(this.value);">
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
  </div>
  `;
}

const setCurrentTimestamp = function (value) {
  window.dataStore.currentTimestamp = value;
  window.renderApp();
};

function createNewsItem({ date, title, contents, feedlabel }) {
  return `
  <div class="${styles.news_item}">
    <h3 class="title">${title}</h3>
    <div>${feedlabel}</div>
    <div>${getDateFromUnixTimestamp(date)}</div>
    <p class="content">${contents}</p>
    <div> All news with tag
      <label for="${feedlabel}">
        <input
          type="checkbox"
          id="${feedlabel}"
          class="main__checkbox"
          name="tag"
          value="${feedlabel}"
          ${window.dataStore.tag == feedlabel ? 'checked' : null}
          onchange="(${setTag})(this.value);"
        />
        <span class="game_name">${feedlabel}</span>
      </label>
    </div>
  </div>`;
}

function setTag(value) {
  if (window.dataStore.tag !== null) {
    window.dataStore.tag = null;
  } else {
    window.dataStore.tag = value;
  }

  window.renderApp();
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
  const { checkedGamesIDs, newsByGames, tag, currentTimestamp, keyword } = window.dataStore;
  let dataNewsContainer = [];

  checkedGamesIDs.map(appid => {
    dataNewsContainer = [...dataNewsContainer, ...newsByGames[appid].appnews.newsitems];
  });

  window.dataStore.filteredNews = filterDataByTimestamp(
    dataNewsContainer,
    currentDate,
    currentTimestamp,
  );

  if (keyword !== '') {
    window.dataStore.filteredNews = dataNewsContainer.filter(el => el.title.includes(keyword));
  }

  if (tag != null) {
    window.dataStore.filteredNews = dataNewsContainer.filter(
      el => el.feedlabel == window.dataStore.tag,
    );
  }

  let content = '';
  sortDataByNewest(window.dataStore.filteredNews).forEach(newsItem => {
    content += createNewsItem(newsItem);
  });
  return `
  <div class="${styles.news_feed}"> ${content} </div>
  `;
}
