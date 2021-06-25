import React, { useEffect } from 'react'
import PostDisplay from '../post';
import styles from './index.module.scss';
import LoadMore from './load-more';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/posts/post-slice';
import { Post } from '../../../types/api.type';
import { RootState } from '../../store';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { getPostsByFilteredHashtags } from '../../store/posts/post-selector';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPostsByFilteredHashtags());
    const search = useSelector((state: RootState) => state.postData.search);

    useEffect(() => {
        dispatch(fetchPosts(search));
    }, [search, dispatch]);

    const NoData = () => {
        return <div className={styles['no-data']}>
            <HelpOutlineIcon />
            <p>No data found.  Try entering something new into the textbox.</p>
        </div>
    }

    const DisplayPosts = () => {
        return <>
            {posts.map((post : Post, i : number) =>  <PostDisplay id={post.id} key={i} />)}
        </>
    }
    
    return <div className={styles['container']}>
        {posts.length 
            ? <DisplayPosts />
            : <NoData />}

            <LoadMore />
    </div>
};

export default PostList;