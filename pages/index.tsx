import { NextPage } from 'next'
import Head from 'next/head'

import Gradient from 'components/Gradient'
import RecentlyUploadedFiles from 'components/RecentlyUploadedFiles'
import Footer from 'components/Footer'

import styles from 'styles/Home.module.scss'

const Home: NextPage = () => (
	<>
		<Head>
			<title key="title">filein</title>
		</Head>
		<Gradient />
		<header className={styles.header}>
			<article className={styles.article}>
				<h1 className={styles.title}>
					The best way to share files
				</h1>
				<p className={styles.subtitle}>
					Super fast file hosting. Free forever.
				</p>
			</article>
			<RecentlyUploadedFiles className={styles.recentlyUploadedFiles} />
		</header>
		<Footer />
	</>
)

export default Home