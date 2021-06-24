import React from 'react'
import styles  from './filter.module.scss'
import HashtagButton from '../hashtag-button/'


export default () => {
    return <div className={styles['filter-container']}>
        <h3>Filter by hashtag</h3>

        <div  className={styles['hashtags']}>
        {["coding", "Python", "ComputerScience", "gitmergememes", "coding", "Engineering"].map((hashtag, i) => {
            {/* Use a key for key if you can */}
            return <span className={styles['hashtag']}><HashtagButton hashtagText={hashtag} key={i} /> </span>
        })}
        </div>
    </div>
}