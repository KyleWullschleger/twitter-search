import React, { useState, useEffect, useCallback } from 'react';
import styles from './search-field.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../../store/posts/post-slice';
import _debounce from 'lodash/debounce';

export default () => {

    const [searchText, setSeachText] = useState<string>('');
    const dispatch = useDispatch();
    const debounceUpdateSearch = useCallback(_debounce((searchText : string) => dispatch(updateSearch(searchText)), 200), []);
    
    useEffect(() => {
        debounceUpdateSearch(searchText);
    }, [searchText]);

    const onKeyPress = (e : React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value
        setSeachText(search)
    }
    return <div className={styles['search-box']}>
        <SearchIcon />
        <input onChange={onKeyPress} value={searchText} placeholder={'Search by keyword'}  />
    </div>
}