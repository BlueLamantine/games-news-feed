import React from 'react';
import styles from './Checkbox.css';

export default function Checkbox({
  id = null,
  label = '',
  onChange = () => {
    return false;
  },
  condition = false,
}) {
  return (
    <>
      <div className={styles.checkbox}>
        <input type="checkbox" id={id} value={id} onChange={onChange} checked={condition} />
        <label htmlFor={id}></label>
        <div className={styles.label_text}>{label}</div>
      </div>
    </>
  );
}
