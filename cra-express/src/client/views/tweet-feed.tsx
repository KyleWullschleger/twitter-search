import react from 'react'
import Header from '../components/header'
import FilterBox from '../components/filter-box'
import SearchField from '../components/search-field'
import PostList from '../components/post-list'
import styles from './tweet-feed.module.scss'

export default () => {
    
    return <>
        <Header>Tweet Feed</Header>
        <div className={styles['container']} role="container">
            
            <div className={styles['main']} role="container">
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