import React from 'react'
import Header from '../components/header'
import FilterBox from '../components/filter-box'
import SearchField from '../components/search-field'
import PostList from '../components/post-list'
import styles from './tweet-feed.module.scss'

const TweetFeed = () => {
    return <>
        <Header>Tweet Feed</Header>
        <div className={styles['container']}>
            <div className={styles['main']}>
                <div>
                    <SearchField />
                </div>
                <div>
                    <PostList />
                </div>
            </div>
            <div className={styles['side-content']}>
                <FilterBox />
            </div>
        </div>
    </>
}

export default TweetFeed;