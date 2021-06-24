import react from 'react'
import styles from './search-field.module.scss'
import SearchIcon from '@material-ui/icons/Search'

export default () => {

    return <div className={styles['search-box']}>
        <SearchIcon />
        <input placeholder={'Search by keyword'}  />
    </div>
}