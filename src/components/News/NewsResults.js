/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, render } from '../../framework';
import { Timestamp } from '../Timestamp/Timestamp';
import Search from '../Search/SearchByKeyword';
import NewsFeed from '../NewsFeed/NewsFeed';

export default function NewsResults({ isLoading, error }) {
  const [currentTimestamp, setCurrentTimestamp] = useState('alltime');
  const [currentKeyword, setCurrentKeyword] = useState('');

  if (error) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Loading...Please, wait. It may takes more than 20 seconds for a first load</div>;
  }

  return (
    <>
      <Timestamp currentTimestamp={currentTimestamp} setCurrentTimestamp={setCurrentTimestamp} />
      <Search currentKeyword={currentKeyword} setCurrentKeyword={setCurrentKeyword} />
      <NewsFeed currentTimestamp={currentTimestamp} currentKeyword={currentKeyword} />
    </>
  );
}
