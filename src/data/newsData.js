import { getNewsForGameUrl, herokuURL } from './SteamAPI';
import renderApp from '../framework/render';
import { getDateFromUnixTimestamp, getYearOfDate, getMonthOfDate, getStartDate } from '../utils';

export default function isCurrentGameDataLoaded() {
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

export function performRetrieve() {
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;
  renderApp();
  loadData()
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
    .finally(renderApp);
}

export function filterDataByTimestamp(data, currentDate, currentTimestamp) {
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
