import React from 'react'
import styles from './index.module.scss'
import HashtagButton from '../hashtag-button/'
import { useSelector } from 'react-redux'
import { getPostById } from '../../store/posts/post-selector'

 const PostDisplay = ({id} : {
    id: number
}) => {

    const post = useSelector(getPostById(id));

    return <div className={styles.post}>
        <div className={styles['profile-image']}>
            <img src={post.profileImageURL} alt={'Profile Pic'}/>
        </div>
        <div className={styles['post-content']}>
            
            <header className={styles['user']} aria-describedby={'posted by'}><a href={post.url} rel="noreferrer" target="_blank"> @{post.userName}</a></header>
            
            <div aria-describedby={'post content'}>
                {post.text} 
                {!!post.embeddedUrl && <a href={post.embeddedUrl} rel="noreferrer" target="_blank">{post.embeddedUrl}</a> }
            </div>
            
            <div className={styles['hashtags']}>
                { post.hashtags.map((hashtag, i )=> <HashtagButton key={i} hashtagText={hashtag} />)}
            </div>
            
        </div>
    </div>
}

export default React.memo(PostDisplay)