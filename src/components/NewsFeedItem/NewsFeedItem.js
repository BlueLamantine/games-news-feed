/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';

import { getDateFromUnixTimestamp } from '../../utils';
import { dataToHTML } from '../../utils';
import Checkbox from '../Checkbox/Checkbox';
import styles from './NewsFeedItem.css';

export default function NewsItem({ itemData, currentTag, onChange }) {
  const { date, title, contents, feedlabel } = itemData;
  return (
    <>
      <div class={styles.news_item}>
        <div class={styles.item_tag}>{feedlabel}</div>
        <h3 class={styles.item_title}>{title}</h3>

        <div class={styles.item_main_content}>
          <div class={styles.item_date}>{getDateFromUnixTimestamp(date)}</div>
          <div class={styles.item_content}>{dataToHTML(contents)}</div>

          <div class={styles.item_more}>
            <span class={styles.item_more_text}> Read all news with tag :</span>
            <>
              <Checkbox
                id={feedlabel}
                label={feedlabel}
                condition={currentTag == feedlabel}
                onChange={event => onChange(event.target.value)}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
