/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../../framework';
import { prepareDataToRender } from '../../data/newsData';
import NewsItem from '../NewsFeedItem/NewsFeedItem';
import { useAppContext, useDataContext } from '../../context';

export default function NewsFeed({ currentTimestamp, currentKeyword }) {
  const selectedGamesIDs = useAppContext();
  const dataStorage = useDataContext();
  const [currentTag, setCurrentTag] = useState(null);

  const changeTag = value => {
    if (currentTag !== null) {
      setCurrentTag(null);
    } else {
      setCurrentTag(value);
    }
  };

  return (
    <>
      <p>News feed:</p>
      <div>tag:{currentTag || 'all tags'}</div>
      <div>
        {prepareDataToRender(
          Array.from(selectedGamesIDs),
          dataStorage,
          currentTimestamp,
          currentKeyword,
          currentTag,
        ).map(item => {
          return (
            <NewsItem
              itemData={item}
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              onChange={changeTag}
            />
          );
        })}
      </div>
    </>
  );
}
