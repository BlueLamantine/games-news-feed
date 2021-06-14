import React from 'react';
import parse from 'html-react-parser';
import { getDateFromUnixTimestamp } from '../../utils';
import Checkbox from '../Checkbox';
import styles from './NewsFeedItem.css';

export default function NewsItem({ itemData, currentTag, changeTag }) {
  const { date, title, contents, feedlabel } = itemData;
  return (
    <div className={styles.news_item}>
      <div className={styles.item_tag}>{feedlabel}</div>
      <h3 className={styles.item_title}>{title}</h3>

      <div className={styles.item_main_content}>
        <div className={styles.item_date}>{getDateFromUnixTimestamp(date)}</div>
        <div className={styles.item_content}>{parse(contents)}</div>

        <div className={styles.item_more}>
          <span className={styles.item_more_text}> Read all news with tag :</span>
          <>
            <Checkbox
              id={feedlabel}
              label={feedlabel}
              condition={currentTag == feedlabel}
              handleChange={event => changeTag(event.target.value)}
            />
          </>
        </div>
      </div>
    </div>
  );
}
