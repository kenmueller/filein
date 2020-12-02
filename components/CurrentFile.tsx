import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import Link from 'next/link'
import { saveAs } from 'file-saver'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faDownload, faLink, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import getFileUrl from 'lib/getFileUrl'
import _deleteFile from 'lib/deleteFile'
import currentFileState from 'state/currentFile'
import useCurrentUser from 'hooks/useCurrentUser'
import useUser from 'hooks/useUser'
import useHideOverlays from 'hooks/useHideOverlays'
import Modal from './Modal'
import FilePreview from './FilePreview'
import EditFileName from './EditFileName'
import Spinner from './Spinner'
import Comments from './Comments'

import styles from 'styles/CurrentFile.module.scss'

const CurrentFile = () => {
	const [file, setFile] = useRecoilState(currentFileState)
	const hideOverlays = useHideOverlays()
	
	const currentUser = useCurrentUser()
	const user = useUser(file?.owner)
	
	const url = file && getFileUrl(file)
	const isOwner = currentUser && currentUser.auth.uid === file?.owner
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const download = useCallback(() => {
		if (file && url)
			saveAs(url, file.name)
	}, [file, url])
	
	const copyLink = useCallback(() => {
		if (!url)
			return
		
		copy(url)
		toast.success('Copied file to clipboard')
	}, [url])
	
	const deleteFile = useCallback(() => {
		if (!(file && window.confirm('Are you sure? You cannot restore a deleted file.')))
			return
		
		_deleteFile(file)
			.catch(({ message }) => toast.error(message))
		
		hideOverlays()
	}, [file, hideOverlays])
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<header className={styles.header}>
				<p className={styles.headerName}>{file?.name}</p>
				<button className={styles.close} onClick={hideOverlays} title="Close">
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.content}>
				{file && (
					<>
						<FilePreview className={styles.preview} file={file} />
						<div className={styles.main}>
							<div className={styles.info}>
								<div className={styles.meta}>
									{isOwner
										? <EditFileName className={styles.editName} file={file} onEdit={setFile} />
										: <p className={styles.name}>{file.name}</p>
									}
									<p className={styles.user}>
										Uploaded by {file.owner
											? user
												? (
													<Link href={`/${user.slug}`}>
														<a className={styles.userLink} onClick={hideOverlays}>
															<span className={styles.userName}>{user.name}</span>
															<FontAwesomeIcon
																className={styles.userIcon}
																icon={faChevronRight}
															/>
														</a>
													</Link>
												)
												: <Spinner className={styles.spinner} />
											: <span className={styles.userName}>anonymous</span>
										}
									</p>
								</div>
								<div className={styles.actions}>
									<button
										className={cx(styles.action, styles.download)}
										onClick={download}
										title="Download"
									>
										<FontAwesomeIcon icon={faDownload} />
									</button>
									<button
										className={cx(styles.action, styles.copy)}
										onClick={copyLink}
										title="Copy"
									>
										<FontAwesomeIcon icon={faLink} />
									</button>
									{isOwner && (
										<button
											className={cx(styles.action, styles.delete)}
											onClick={deleteFile}
											title="Delete"
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									)}
								</div>
							</div>
							<Comments className={styles.comments} file={file} />
						</div>
					</>
				)}
			</div>
		</Modal>
	)
}

export default CurrentFile
