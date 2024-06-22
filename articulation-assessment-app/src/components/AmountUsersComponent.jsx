import React from 'react';
import styles from "./css/AmountUsers.module.css";

const AmountUsersComponent = () => {

  return (
    <div className={styles.box}>
      <div className={styles.counter} >0</div>
      <p className={styles.text}>Users</p>
    </div>
  );
}

export default AmountUsersComponent;
