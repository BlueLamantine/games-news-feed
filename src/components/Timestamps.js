/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { getDateFromUnixTimestamp, getYearOfDate, getMonthOfDate } from '../utils';

const TIMESTAMPS = [
  { id: 'all', value: 'alltime', name: 'All news' },
  { id: 'today', value: 'today', name: 'Today' },
  { id: 'week', value: 'week', name: 'For last 7 days' },
  { id: 'month', value: 'month', name: 'This month' },
];

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

export function Timestamps({ currentTimestamp, setCurrentTimestampCB }) {
  return (
    <>
      <div>
        <p>Timestamps</p>
        <select id="selectTimestamp" onChange={event => setCurrentTimestampCB(event.target.value)}>
          {TIMESTAMPS.map(({ id, value, name }) => {
            return (
              <option
                value={value}
                id={id}
                name="timestamp-option"
                {...(value === currentTimestamp ? { selected: '' } : {})}
              >
                {name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

function getStartDate() {
  let now = new Date();
  let start = new Date(now);
  let dayOfWeek = now.getDay();
  let numDay = now.getDate() + 1;
  start.setDate(numDay - dayOfWeek - 6);

  return Math.floor(start / 1000);
}
