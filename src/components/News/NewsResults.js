/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../../framework';
import Timestamp from '../Timestamp';
import Search from '../Search';
import NewsFeed from '../NewsFeed';
import styles from './NewsResults.css';
import News from '.';

export default function NewsResults({ isLoading, error }) {
  const [currentTimestamp, setCurrentTimestamp] = useState('alltime');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentTag, setCurrentTag] = useState(null);

  const changeTag = value => {
    if (currentTag !== null) {
      setCurrentTag(null);
    } else {
      setCurrentTag(value);
    }
  };

  if (error) {
    return <div class={styles.error}>error</div>;
  }

  if (isLoading) {
    return (
      <div class={styles.loading}>
        Loading...Please, wait. It may takes more than 20 seconds for a first load
      </div>
    );
  }

  return (
    <>
      <div class={styles.header}>
        <Search currentKeyword={currentKeyword} setCurrentKeyword={setCurrentKeyword} />
        <Timestamp currentTimestamp={currentTimestamp} setCurrentTimestamp={setCurrentTimestamp} />
      </div>
      <div class={styles.main_container}>
        <div class={styles.main_header}>
          <h1 class={styles.header_text}>Games News Feed</h1>
          <div class={styles.tag_container}>
            <span class={styles.tag_title}>News by tag :</span> {currentTag || <span>*</span>}
          </div>
        </div>
        <div class={styles.news_feed}>
          <NewsFeed
            currentTimestamp={currentTimestamp}
            currentKeyword={currentKeyword}
            currentTag={currentTag}
            changeTag={changeTag}
          />
        </div>
      </div>
    </>
  );
}
