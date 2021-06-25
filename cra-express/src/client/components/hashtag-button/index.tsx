import React from 'react';
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addFilter, removeFilter } from '../../store/posts/post-slice';
import clsx from 'clsx';


const HashtagButton = ({ hashtagText } : {
    hashtagText: string
}) => {
    const hashtagFilters = useSelector((state: RootState) => state.postData.filter);
    const dispatch = useDispatch();

    const onClick = () => {
        if(hashtagFilters.includes(hashtagText)) {
            dispatch(removeFilter(hashtagText));
        } else {
            dispatch(addFilter(hashtagText));
        }
    };

    return <button className={clsx({
            [styles['hashtag']] : true,
            [styles['dark']] : hashtagFilters.includes(hashtagText)
    })} onClick={onClick}>{`#${hashtagText}`}</button>
}

export default React.memo(HashtagButton);