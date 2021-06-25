import React from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMorePosts } from '../../store/posts/post-slice';
import { RootState } from '../../store';
import LoopIcon from '@material-ui/icons/Loop';

export default () => {
    const dispatch = useDispatch();
    const unableToFetch = useSelector((state : RootState) => !state.postData.meta.maxId);
    const status = useSelector((state : RootState) => state.postData.status);

    const onButtonClick = () => {
        if(!unableToFetch  && status !== "loading") {
            dispatch(fetchMorePosts());
        }
    }

    const buttonContent = (()=> {
        if(status === "loading") return <LoopIcon className={styles['spinner']} />;
        if(unableToFetch) return <>End of content</>;
        if(status === "succeeded") return <>Load more</>;
        return null;
    })()

    return <button  onClick={onButtonClick} className={styles['load-more']}>
        {buttonContent}
    </button>
}