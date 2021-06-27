import React from 'react';
import Header from '../components/header';
import FilterBox from '../components/filter-box';
import SearchField from '../components/search-field';
import PostList from '../components/post-list';
import styles from './tweet-feed.module.scss';

const TweetFeed = () => {
    return <>
        <div className={styles['header']}>
            <Header>Tweet Feed</Header>
        </div>
        <div className={styles['container']}>
            <div className={styles['search']} >
                <SearchField />
            </div>
            <div className={styles['side-content']}>
                <FilterBox />
            </div>
            <div>
                <PostList />
            </div>
        </div>
    </>
};

export default TweetFeed;