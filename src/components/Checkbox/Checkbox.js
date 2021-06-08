import React from 'react';
import styles from './Checkbox.css';

export default function Checkbox({ id = null, label = '', onChange = null, condition = false }) {
  return (
    <>
      <div className={styles.checkbox}>
        <input type="checkbox" id={id} value={id} defaultChecked={condition} onChange={onChange} />
        <label htmlFor={id}></label>
        <div className={styles.label_text}>{label}</div>
      </div>
    </>
  );
}
