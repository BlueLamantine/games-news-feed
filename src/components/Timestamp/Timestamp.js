/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';

const TIMESTAMPS = [
  { id: 'all', value: 'alltime', name: 'All news' },
  { id: 'today', value: 'today', name: 'Today' },
  { id: 'week', value: 'week', name: 'For last 7 days' },
  { id: 'month', value: 'month', name: 'This month' },
];

export function Timestamp({ currentTimestamp, setCurrentTimestamp }) {
  return (
    <>
      <div>
        <p>Timestamps</p>
        <select id="selectTimestamp" onChange={event => setCurrentTimestamp(event.target.value)}>
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
