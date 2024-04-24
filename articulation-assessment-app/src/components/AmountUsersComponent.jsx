import React, { useEffect, useRef } from 'react';
import styles from "./css/AmountUsers.module.css";

const AmountUsersComponent = ({ Type }) => {
  let amount = 0;
  //Replace this with API call
  if (Type === "Children") {
    amount = 62;
  } else if (Type === "Speech therapists") {
    amount = 12;
  } else {
    amount = 30;
  }

  const counterRef = useRef(null);

  useEffect(() => {
    const animateCounter = () => {
      const target = amount;
      const duration = 9000; 
      const fps = 6;
      const increment = (target / duration) * (1000 / fps); // Calculate increment per frame
  
      const updateCount = () => {
        const count = +counterRef.current.innerText;
  
        if (count < target) {
          counterRef.current.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 1000 / fps); // Adjusted timeout for smoother animation
        } else {
          counterRef.current.innerText = target;
        }
      };
  
      updateCount();
    };
  
    animateCounter();
  }, [amount]);

  return (
    <div className={styles.box}>
      <div className={styles.counter} ref={counterRef}>0</div>
      <p className={styles.text}>{Type}</p>
    </div>
  );
}

export default AmountUsersComponent;
