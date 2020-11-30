import firebase from 'lib/firebase'
import Dropdown from './Dropdown'
import AuthDropdownTrigger, { authDropdownTriggerClassName } from './AuthDropdownTrigger'

import 'firebase/auth'

export interface AuthDropdownProps {
	className?: string
	currentUser: firebase.User
}

const AuthDropdown = ({ className, currentUser }: AuthDropdownProps) => {
	return (
		<Dropdown
			rootClassName={className}
			triggerClassName={authDropdownTriggerClassName}
			trigger={<AuthDropdownTrigger currentUser={currentUser} />}
		>
			AuthDropdownContent
		</Dropdown>
	)
}

export default AuthDropdown
