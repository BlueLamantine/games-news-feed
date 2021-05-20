/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { filterDataByTimestamp } from './Timestamps';
import { currentDate, sortDataByNewest } from '../utils';
import NewsItem from './NewsFeedItem';

export default function NewsFeed() {
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

  window.dataStore.filteredNews = sortDataByNewest(window.dataStore.filteredNews);
  return (
    <>
      <p>News feed:</p>
      <div>
        {window.dataStore.filteredNews.map(item => {
          return <NewsItem itemData={item} />;
        })}
      </div>
    </>
  );
}
