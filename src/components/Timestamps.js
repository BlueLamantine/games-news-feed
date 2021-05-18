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

export function renderTimestamps(currentTimestamp, setCurrentTimestampCB) {
  return `
    <div>
    <legend>Timestamps</legend>
    <select id="selectTimestamp" onchange="(${setCurrentTimestampCB})(this.value);">
  ${TIMESTAMPS.map(
    ({ id, value, name }) =>
      `
        <option  
            id="${id}" 
            name="timestamp-option"
            value="${value}"
            ${currentTimestamp === value ? ' selected ' : ''}
            >${name}</option>
   
    `,
  ).join('')}
    </select>
    </div>
    `;
}

function getStartDate() {
  let now = new Date();
  let start = new Date(now);
  let dayOfWeek = now.getDay();
  let numDay = now.getDate() + 1;
  start.setDate(numDay - dayOfWeek - 6);

  return Math.floor(start / 1000);
}
