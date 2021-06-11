import React from 'react';
import { prepareDataToRender } from '../../data/newsData';
import NewsItem from '../NewsFeedItem';
import { useAppContext, useDataContext } from '../../context';

export default function NewsFeed({ currentTimestamp, currentKeyword, changeTag, currentTag }) {
  const selectedGamesIDs = useAppContext();
  const dataStorage = useDataContext();
  let dataToRender = [];
  dataToRender = prepareDataToRender(
    Array.from(selectedGamesIDs),
    dataStorage,
    currentTimestamp,
    currentKeyword,
    currentTag,
  );
  if (dataToRender.length == 0) {
    return <div>There are no results that match your request</div>;
  }
  return (
    <>
      {dataToRender.map(item => {
        return (
          <NewsItem key={item.gid} itemData={item} currentTag={currentTag} changeTag={changeTag} />
        );
      })}
    </>
  );
}
