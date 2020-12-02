import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import firebase from 'lib/firebase'
import SignOutButton from './SignOutButton'

import styles from 'styles/AuthDropdownContent.module.scss'

import 'firebase/auth'

export interface AuthDropdownContentProps {
	currentUser: firebase.User
	onClick?(): void
}

const AuthDropdownContent = ({ currentUser, onClick }: AuthDropdownContentProps) => (
	<>
		<Link href={`/${currentUser.uid}`}>
			<a className={styles.action} onClick={onClick}>
				<FontAwesomeIcon icon={faUser} />
				<p className={styles.actionMessage}>My files</p>
			</a>
		</Link>
		<SignOutButton className={cx(styles.action, styles.danger)} onClick={onClick}>
			<FontAwesomeIcon icon={faSignOutAlt} />
			<p className={styles.actionMessage}>Sign out</p>
		</SignOutButton>
	</>
)

export const authDropdownContentClassName = styles.root
export default AuthDropdownContent
