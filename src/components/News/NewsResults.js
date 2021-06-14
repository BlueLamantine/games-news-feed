import React, { useState } from 'react';
import Timestamp from '../Timestamp';
import Search from '../SearchBar';
import NewsFeed from '../NewsFeed';
import styles from './NewsResults.css';

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
    return <div className={styles.error}>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading...Please, wait. It may takes more than 20 seconds for a first load
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <Search value={currentKeyword} handleSearch={setCurrentKeyword} currentTag={currentTag} />
        <Timestamp
          currentTimestamp={currentTimestamp}
          setCurrentTimestamp={setCurrentTimestamp}
          currentTag={currentTag}
        />
      </div>
      <div className={styles.main_container}>
        <div className={styles.main_header}>
          <h1 className={styles.header_text}>Games News Feed</h1>
          <div className={styles.tag_container}>
            <span className={styles.tag_title}>News by tag :</span> {currentTag || <span>*</span>}
          </div>
        </div>
        <div className={styles.news_feed}>
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
