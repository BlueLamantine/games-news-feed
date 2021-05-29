/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';

import { getDateFromUnixTimestamp } from '../../utils';
import { dataToHTML } from '../../utils';
import Checkbox from '../Checkbox/Checkbox';

export default function NewsItem({ itemData, currentTag, onChange }) {
  const { date, title, contents, feedlabel } = itemData;
  return (
    <>
      <h3 class="title">{title}</h3>
      <div>{feedlabel}</div>
      <div>{getDateFromUnixTimestamp(date)}</div>
      <p>{dataToHTML(contents)}</p>
      <div>
        {' '}
        All news with tag
        <>
          <Checkbox
            id={feedlabel}
            label={feedlabel}
            condition={currentTag == feedlabel}
            onChange={event => onChange(event.target.value)}
          />
        </>
      </div>
    </>
  );
}
