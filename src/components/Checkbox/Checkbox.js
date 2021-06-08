/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import styles from './Checkbox.css';

export default function Checkbox({ id = null, label = '', onChange = null, condition = false }) {
  return (
    <div class={styles.checkbox}>
      <input type="checkbox" id={id} value={id} checked={condition} onChange={onChange} />
      <label For={id}></label>
      <div data-id={'link'} class={styles.label_text}>
        {label}
      </div>
    </div>
  );
}
