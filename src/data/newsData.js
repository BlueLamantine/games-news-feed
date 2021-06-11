import {
  getDateFromUnixTimestamp,
  getYearOfDate,
  getMonthOfDate,
  getStartDate,
  currentDate,
  sortDataByNewest,
} from '../utils';

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

export function prepareDataToRender(
  selectedGamesIDs,
  dataStorage,
  currentTimestamp,
  currentKeyword,
  currentTag,
) {
  let dataNewsContainer = [];
  let filteredNews = [];
  selectedGamesIDs.map(appid => {
    if (dataStorage[appid] !== undefined) {
      dataNewsContainer = [...dataNewsContainer, ...dataStorage[appid].appnews.newsitems];
    }
  });

  filteredNews = filterDataByTimestamp(dataNewsContainer, currentDate, currentTimestamp);

  if (currentKeyword !== '') {
    filteredNews = filteredNews.filter(el => el.title.includes(currentKeyword));
  }

  if (currentTag) {
    filteredNews = dataNewsContainer.filter(el => el.feedlabel == currentTag);
  }

  return sortDataByNewest(filteredNews);
}
