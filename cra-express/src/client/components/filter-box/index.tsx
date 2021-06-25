import React, { useMemo } from 'react';
import styles  from './filter.module.scss';
import HashtagButton from '../hashtag-button/';
import { useSelector} from 'react-redux';
import { getUniqueHashtags } from '../../store/posts/post-selector';

export default () => {
    const hashtags = useSelector(getUniqueHashtags());
    const uniqueHashtags = useMemo(() => Array.from(new Set(hashtags.flat())), [hashtags]);
    
    return <div className={styles['filter-container']}>
        <h3>Filter by hashtag</h3>

        <div  className={styles['hashtags']}>
            {uniqueHashtags.map((hashtag, i) => {
                return <span className={styles['hashtag']}><HashtagButton hashtagText={hashtag} key={i} /> </span>
            })}
        </div>
    </div>
}