import Head from 'next/head'
import Link from 'next/link'

import 'antd/dist/antd.css';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'Tracks'
export const siteTitle = 'Tracks'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`${siteTitle} helps you find the next best train (if you live where I live)`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{name}</a>
          </Link>
        </h2>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
