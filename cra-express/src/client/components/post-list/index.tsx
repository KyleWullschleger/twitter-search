import React from 'react'
import Post from '../post'
import styles from './index.module.scss'
import LoadMore from './load-more'
export default () => {

    return <div className={styles['container']}>
        {
            [1,2,3,4,5].map(id =>  <Post id={`${id}`} />)
        }
        <LoadMore />
    </div>
}