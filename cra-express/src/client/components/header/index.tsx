import React from 'react'
import styles from './header.module.scss'

export default ({children} :
      { children : React.ReactNode}) => {
    return <header className={styles.main}>{children}</header>
}