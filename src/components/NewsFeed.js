import { filterDataByTimestamp } from './Timestamps';
import { getDateFromUnixTimestamp, currentDate, sortDataByNewest } from '../utils';

function setTag(value) {
  if (window.dataStore.tag !== null) {
    window.dataStore.tag = null;
  } else {
    window.dataStore.tag = value;
  }

  window.renderApp();
}

function createNewsItem({ date, title, contents, feedlabel }) {
  return `
    <div>
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

export function renderNewsFeed() {
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
    window.dataStore.filteredNews = dataNewsContainer.filter(el => el.feedlabel == tag);
  }

  let content = '';

  sortDataByNewest(window.dataStore.filteredNews).forEach(newsItem => {
    content += createNewsItem(newsItem);
  });
  return `
    <div> ${content} </div>
    `;
}
