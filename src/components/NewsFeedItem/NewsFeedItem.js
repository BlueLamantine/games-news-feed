/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import { getDateFromUnixTimestamp } from '../../utils';
import { dataToHTML } from '../../utils';
import Checkbox from '../Checkbox/Checkbox';

export default function NewsItem({ itemData, setTagCB }) {
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
            condition={window.dataStore.tag == feedlabel}
            onChange={event => setTagCB(event.target.value)}
          />
        </>
      </div>
    </>
  );
}
