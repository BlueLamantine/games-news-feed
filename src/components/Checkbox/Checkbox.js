/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
//import styles from './Checkbox.css';

export default function Checkbox({ id = null, label = '', onChange = null, condition = false }) {
  return (
    <label For={id}>
      <input type="checkbox" id={id} value={id} checked={condition} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
  /* return (
    <label className={[styles.check, styles.option]}>
      <input className={styles.check__input} type="checkbox" onChange={onChange} />
      <span className={styles.check__box}></span>
      {label}
    </label>
  );*/
}
