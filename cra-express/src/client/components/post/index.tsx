import React from 'react'
import styles from './index.module.scss'
import HashtagButton from '../hashtag-button/'

 const Post = ({id} : {
    id: string
}) => {

    return <div className={styles.post}>
        <div className={styles['profile-image']}>
            <img src={'https://pbs.twimg.com/profile_images/1013850694367916032/iWn_LbJA_normal.jpg'} />
        </div>
        <div className={styles['post-content']}>
            <header className={styles['user']} aria-describedby={'posted by'}>@texasdemocrats</header>
            <text aria-describedby={'post content'}>
                {`Greg Abbott vetoed a bill that would've ensured protection for dogs left in extreme weather conditions. \n\nIn wake o… https://t.co/sSJOJdZtIy`}
            
            </text>
            
            <div className={styles['hashtags']}>
                <HashtagButton hashtagText={"test"} />
            </div>
            
        </div>
    </div>
}

export default React.memo(Post)