import React from 'react'
import styles from './index.module.scss'

const hashtagButton = ({hashtagText} : {
    hashtagText: string
}) => {
    return <div className={styles['hashtag']}>
        <button>{`#${hashtagText}`}</button>
    </div>
}

export default React.memo(hashtagButton)