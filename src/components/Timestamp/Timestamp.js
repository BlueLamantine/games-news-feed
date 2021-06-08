import React from 'react';
import styles from './Timestamp.css';
const TIMESTAMPS = [
  { id: 'all', value: 'alltime', name: 'All news' },
  { id: 'today', value: 'today', name: "Today's news" },
  { id: 'week', value: 'week', name: 'News for last 7 days' },
  { id: 'month', value: 'month', name: 'This month news' },
];

export default function Timestamp({ currentTimestamp, setCurrentTimestamp }) {
  return (
    <>
      <div className={styles.timestamp}>
        <select id="selectTimestamp" onChange={event => setCurrentTimestamp(event.target.value)}>
          {TIMESTAMPS.map(({ id, value, name }) => {
            return (
              <option
                key={id}
                value={value}
                id={id}
                name="timestamp-option"
                {...(value === currentTimestamp ? { defaultValue: '' } : {})}
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
