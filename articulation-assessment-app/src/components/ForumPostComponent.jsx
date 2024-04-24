import React, { useEffect, useRef } from 'react';
import styles from "./css/ForumPost.module.css";

const AmountUsersComponent = ({ number_latest }) => {

  //API get latest forum post



  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <p>Parent</p>
      </div>
      <div className={styles.content}>
        <p className={styles.subject}>Excercises for the letter A</p>
        <p className={styles.information}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
      </div>
        <button className={styles.read}>Read more</button>
    </div>
  );
}

export default AmountUsersComponent;
