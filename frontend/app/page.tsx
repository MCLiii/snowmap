'use client'

import  localFont from 'next/font/local'
import { useState } from "react"
import styles from "./styles/Home.module.css"

const fonts = localFont({src: './styles/fonts/ContrailOne-Regular.ttf'});

export default function Home() {
  const [isRecommend, setIsRecommend] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={`${fonts.className} ${styles.head}`}>Your Ultimate Ski Vacation Starts Here</h1>
      <div className={styles.hero}>
        <div className={styles.tabContainer}>
          <div 
            className={`${styles.tab} ${!isRecommend ? styles.active : ''}`} 
            onClick={() => setIsRecommend(false)}
          >
            Book Trip
          </div>
          <div 
            className={`${styles.tab} ${isRecommend ? styles.active : ''}`} 
            onClick={() => setIsRecommend(true)}
          >
            Recommend
          </div>
        </div>
        {isRecommend ? (
          <div className={styles.recommendContainer}>
            <h1>Let’s Find the Perfect Destination For You...</h1>
            <button className={styles.button}>Let’s Go</button>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <input type="text" placeholder="Where" className={styles.input}/>
            <input type="text" placeholder="When" className={styles.input}/>
            <input type="text" placeholder="Who" className={styles.input}/>
            <button className={styles.button}>
              <span role="img" aria-label="search">❄️</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
