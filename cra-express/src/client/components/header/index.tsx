import React from 'react'
import styles from './header.module.scss'

const header = ({children} :
      { children : React.ReactNode}) => {
    return <header className={styles.main}>{children}</header>
};

export default header;