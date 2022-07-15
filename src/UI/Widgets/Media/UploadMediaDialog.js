import { useState } from 'react'

import { Dialog, Stack, debounce, Alert, Button as MuiButton } from "@mui/material"
import Tooltip from '@mui/material/Tooltip';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';

import Upload from "images/Upload.PNG"

import {
	MediaUploadHeader,
	MediaUploadItem,
} from 'UI/Tables/MediaUpload/MediaUploadTable'

import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'
import MediaInputTitle from 'UI/Forms/Inputs/MediaInputTitle'

import useAlerts from 'Hooks/AlertHooks'

import { formatDate, getFullName } from "utils/Parser"

import { useTeamMembers, usePlaceholders, useTags, useContacts, useMediaMutation } from 'Api/ReactQuery';

import {
	getAssociatedContactByFileName,
} from 'Api/Helper'

import {
	createPlaceholder,
	addTagToMedia
} from 'Api/Endpoints'

export const FileDropZone = (props) => {

	const onBrowseClick = () => {
		props.browseAction ? props.browseAction(true) : document.getElementById("browse").click()
	}

	return (
		<Stack
			alignItems="center"
			justify="center"
			style={{
				height: "max-content",
				background: "#fafcfd",
				// marginTop: 16,
				marginBottom: 16,
				borderRadius: 4,
				border: "1px dotted gray",
				padding: 16,
				...props.style
			}}
			onDragOver={(e) => e.preventDefault()}
			onDrop={props.onDrop}
		>
			<img src={Upload} style={{ userSelect: 'none', userDrag: 'none' }} />
			<p style={{ width: "100%", textAlign: "center", color: "#a2acc1", margin: 0 }}>
				Upload Media
			</p>

			<p style={{ width: "100%", textAlign: "center", color: "#a2acc1", margin: 0 }}>
				Drag and Drop or{" "}
				<span
					style={{ color: "#6aa8f4", cursor: "pointer" }}
					onClick={onBrowseClick}
				>
					Browse
				</span>{" "}
				your {props.browseAction ? "Media Library" : "files here"}
			</p>
		</Stack>
	);
}

const dummyFiles = [
	// { name: "file1.png" },
	// { name: "test.png" },
	// { name: "test2.png" },
	// { name: "file1.png" },
	// { name: "test.png" },
	// { name: "test2.png" },
]

const dummyUploadProgress = [
	// "none",
	// "ready",
	// "uploading",
	// "success",
	// "failed",
	// "failed",
]

const dummyAssociatedPeople = [
	// { first_name: "Ben", last_name: "Graves"},
	// null,
	// null,
	// { first_name: "Ben", last_name: "Graves"},
	// null,
	// null,
]

export default function UploadMediaDialog(props) {
	const teamMembers = useTeamMembers()
	const tags = useTags()
	const placeholders = usePlaceholders(1, 24)
	const contacts = useContacts()
	const { createAsync: uploadMedia } = useMediaMutation()

	const [selectedOwner, setSelectedOwner] = useState([])
	const [selectedTags, setSelectedTags] = useState([])
	const [selectedPlaceholders, setSelectedPlaceholders] = useState([])

	const [uploadStatus, setUploadStatus] = useState(dummyUploadProgress)
	const [uploadingMedia, setUploadingMedia] = useState(false)

	// Media
	const [dropFiles, setDropFiles] = useState(dummyFiles);

	// Upload Process
	const [uploadStatusCount, setUploadStatusCount] = useState({ success: 0, failed: 0, total: 0 })
	const [uploadFinished, setUploadFinished] = useState(false)
	const [failedUploads, setFailedUploads] = useState([])

	// Alerts
	const [alerts, setAlerts] = useAlerts()

	const [associatedPeople, setAssociatedPeople] = useState(dummyAssociatedPeople)

	// console.log(placeholders)

	const onMediaAlertClose = (index) => {
		setAlerts.remove(index)
	}

	const handleAssociateContactToFile = (files, associated, uploadStatus) => {
		return new Promise((resolve, reject) => {

			let count = files.length

			//console.log("start count " + count)

			files.forEach((file, index) => {
				getAssociatedContactByFileName(file.name)
					.then(contact => {
						associated[index] = contact

						//console.log("return " + index)
						//console.log(associated)
					})
					.catch(error => {
						console.log("error " + error)
						associated[index] = null

						//console.log(associated)

						if (error === "found multiple contacts") {
							// TODO: alert user that could not auto associate
							// due to search returning multiple contacts
							//console.log("contact " + index + "error 1")

							// using timeout so state can be updated before next setAlerts call
							setTimeout(() => {
								setAlerts.push("One or more files were not associated to a contact based on their file name")
							}, 200 * index)

							// setMediaAlert({
							//   message: ,
							//   visible: true
							// })
						} else if (error === "could not find contacts") {
							// TODO: alert user that could not auto associate
							// due to search not finding any contacts

							// using timeout so state can be updated before next setAlerts call
							//setTimeout(() => {
							//  setAlerts.push("One or more files were not associated to a contact based on their file name because no contacts were found")

							//}, 50 * index)

							// setMediaAlert({
							//   message: ,
							//   visible: true
							// })
						} else {
							// TODO: handle axios/server error
						}
					})
					.finally(() => {
						uploadStatus[index] = "ready"

						count--

						//console.log("finally " + count)
						//console.log(associated)

						if (count == 0) {
							resolve([files, associated])
						}
					})
			})
		})
	}

	const isFileValid = (file) => {
		const { type, size } = file
		const PERMITTED_IMAGES_TYPES = ["/png", "/jpeg", "/jpg", "/gif",]
		const MAX_IMAGE_SIZE = 5000000 // 5MB
		const isImageValid = PERMITTED_IMAGES_TYPES.some(extension => type.toLowerCase().includes(extension)) && size < MAX_IMAGE_SIZE

		const PERMITTED_OTHER_TYPES = ["/pdf", "/mp4"]
		const MAX_OTHER_FILES_SIZE = 15000000 // 15MB
		const isOtherFilesValid = PERMITTED_OTHER_TYPES.some(extension => type.toLowerCase().includes(extension)) && size < MAX_OTHER_FILES_SIZE
		return isImageValid || isOtherFilesValid
	}

	const handleImportFiles = (files) => {
		let tempFiles = []
		let tempAssociated = []
		let tempUploadStatus = []

		let pushedCount = 0

		for (let i = 0; i < files.length; i++) {
			let file = files[i]

			if (isFileValid(file)) {
				tempFiles.push(file)
				tempAssociated.push("loading")
				tempUploadStatus.push("none")
			}
		}

		if (files.length != tempFiles.length) {
			setAlerts.push("One or more files were not added since they do not match the file upload criteria")
		}

		const initialAssociated = Object.assign([], associatedPeople)
		const initialUploadStatus = Object.assign([], uploadStatus)

		handleAssociateContactToFile(tempFiles, tempAssociated, tempUploadStatus)
			.then(() => {
				setAssociatedPeople(initialAssociated.concat(tempAssociated))
				setUploadStatus(initialUploadStatus.concat(tempUploadStatus))

			})

		setAssociatedPeople(associatedPeople.concat(tempAssociated))
		setDropFiles(dropFiles.concat(tempFiles));
		setUploadStatus(uploadStatus.concat(tempUploadStatus))
	}

	const handleFileChange = (e) => {
		handleImportFiles(e.target.files)
	}

	const onDrop = (e) => {
		e.preventDefault();
		handleImportFiles(e.dataTransfer.files)
	}

	const deleteMedia = (index) => {
		let tempFiles = Object.assign([], dropFiles)
		let tempAssociated = Object.assign([], associatedPeople)
		let tempUploadStatus = Object.assign([], uploadStatus)

		tempFiles.splice(index, 1)
		tempAssociated.splice(index, 1)
		tempUploadStatus.splice(index, 1)

		setDropFiles(tempFiles)
		setAssociatedPeople(tempAssociated)
		setUploadStatus(tempUploadStatus)
	}

	const onUploadMedia = () => {
		// console.log(selectedTags)

		// return

		if (uploadFinished) {
			close()
			return
		}

		if (dropFiles.length == 0) {
			setAlerts.push("You forgot to import media files to upload")
			return
		}

		// uploadingMedia
		// associatedPeople
		// uploadProgress
		// dropFiles

		// selectedPlaceholders[0]
		// selectedTags
		// selectedOwner[0]

		// console.log('testing')

		// setSelectedPlaceholders(oldValue => ([{ id: oldValue[0].id, name: oldValue[0].name, test: 'worked'}]))
		// 	.then(() => {
		// 		console.log('finsihed')
		// 		console.log(selectedPlaceholders)
		// 	})


		// return
		// return console.log(selectedOwner)

		if (selectedPlaceholders[0] && selectedPlaceholders[0].id.toString().includes('new-')) {
			//console.log(selectedPlaceholders[0])

			createPlaceholder(selectedPlaceholders[0].name)
				.then(res => {
					console.log(res)
					handleUpload(res.data.id)
				})
				.catch(error => {
					console.log(error)
				})
		} else {
			handleUpload()
		}
	}

	const handleUpload = (withPlaceholder) => {
		setUploadingMedia(true)

		let count = dropFiles.length
		let failedCount = 0
		let successCount = 0

		const mediaUploadData = dropFiles.map((file, index) => {
			let media = {
				file,
				owner: selectedOwner[0]?.id.toString(),
				placeholder: withPlaceholder || selectedPlaceholders[0]?.id.toString(),
				contact: associatedPeople[index]?.id.toString(),
				selectedTags: selectedTags
			}
			return media
		})

		mediaUploadData.forEach((media, index) => {

			setUploadStatus(status => {
				status[index] = "uploading"
				return status
			})

			uploadMedia(media).then(mediaRes => {
				setUploadStatus(status => {
					status[index] = "success"
					return status
				})
				successCount++

				selectedTags.forEach(tag => {
					addTagToMedia(mediaRes.id, tag.name)
						.then(res => {
							//console.log(res)
						})
						.catch(error => {
							//console.log(error)
						})
					//}
				})
			}).catch(error => {
				setUploadStatus(status => {
					status[index] = "failed"
					return status
				})

				failedCount++
			}).finally(() => {
				count--
				if (count == 0) {
					setUploadingMedia(false)
					onUploadFinished(uploadStatus, successCount, failedCount, dropFiles.length)
				}
			})
		})
	}

	const onUploadFinished = (tempUploadStatus, successCount, failedCount, totalCount) => {

		const failedUploadsFiles = tempUploadStatus.reduce((acc, status, index) => {
			if (status === 'success')
				acc.push(dropFiles[index])
			return acc
		}
			, [])

		setFailedUploads(failedUploadsFiles)
		setUploadStatusCount({ success: successCount, failed: failedCount, total: totalCount })
		setUploadFinished(true)
	}

	const onCloseMedia = () => {
		if (!uploadFinished)
			props.onClose()

		clearAllFields()
	}

	const close = () => {
		props.onClose()
		clearAllFields()
	}

	const clearAllFields = () => {
		setDropFiles([])
		setAssociatedPeople([])
		setUploadStatus([])
		setSelectedOwner([])
		setSelectedPlaceholders([])
		setSelectedTags([])
		setUploadFinished(false)
		setAlerts.clear()
	}

	const associateContactToMedia = (selection, index) => {
		// ////console.log("This is the contact ", teamContact, index);

		let temp = Object.assign([], associatedPeople)
		temp[index] = selection[0]
		setAssociatedPeople(temp)

	}

	const removeContactFromMedia = (index) => {
		//////console.log("on remove contact from media")
		let temp = Object.assign([], associatedPeople)
		temp[index] = null
		//////console.log(temp)
		setAssociatedPeople(temp)
	}

	const onOwnerChange = (owner) => {
		if (owner.length <= 1) {
			setSelectedOwner(owner)
		} else {
			setSelectedOwner([owner[owner.length - 1]])
		}
	}

	const onOwnerInputChange = debounce((value) => {
		teamMembers.search(value)
	}, 500)

	const onSearchContacts = (input) => {
		contacts.filter({ search: input })
	}

	const onClearSearchContacts = () => {
		contacts.clearFilter()
	}

	const onTagsChange = (tags) => {
		setSelectedTags(tags)
	}

	const onTagsInputChange = debounce((value) => {
		tags.search(value)
	})

	const onTagsKeyPress = (event) => {
		if (event.key === 'Enter' && event.target.value !== '') {
			let newTag = {
				id: "new-" + Date.now(),
				name: event.target.value
			}

			setSelectedTags(currentTags => currentTags.concat([newTag]))
		}
	}

	const onPlaceholdersChange = (placeholder) => {
		if (placeholder.length <= 1) {
			setSelectedPlaceholders(placeholder)
		} else {
			setSelectedPlaceholders([placeholder[placeholder.length - 1]])
		}
	}

	const onPlaceholdersInputChange = debounce((value) => {
		if (value && value !== ' ') {
			placeholders.filter({ search: value })
		} else {
			placeholders.clearFilter()
		}
	}, 500)

	const onPlaceholdersKeyPress = (event) => {
		if (event.key === 'Enter' && event.target.value !== '') {
			let newPlaceholder = {
				id: "new-" + Date.now(),
				name: event.target.value
			}

			setSelectedPlaceholders([newPlaceholder])
		}
		// console.log(event.key)
		// console.log(event.target.value)
	}


	const files = uploadFinished ? failedUploads : dropFiles
	//console.log(associatedPeople)

	return (
		<Dialog
			maxWidth="md"
			fullWidth
			scroll={"body"}
			open={props.open}
			onClose={props.onClose}
		>
			<input
				type="file"
				name="image"
				id={"browse"}
				multiple
				style={{ display: "none" }}
				// value={post.image.name}
				onChange={handleFileChange}
			/>

			<Stack direction="row" margin={2} mb={0} spacing={2}>
				<InsertDriveFileIcon
					style={{ color: "#3871da" }}
				/>

				<p style={{ width: "90%", fontWeight: 700 }}>
					Create Placeholder & Upload Media
				</p>
			</Stack>

			<Stack padding={2} pt={0} maxHeight={700} sx={{ overflowY: 'auto' }}>


				{uploadFinished &&
					<Stack
						alignItems="center"
						justifyContent="center"
						style={{ padding: 50 }}
					>
						<MediaInputTitle title="Upload Complete" style={{ fontWeight: 700, fontSize: 30 }} />
						<MediaInputTitle title={`${uploadStatusCount.success} of ${uploadStatusCount.total} files uploaded successfully`} style={{ marginTop: 0, fontSize: 20 }} />
						<MediaInputTitle title={`${uploadStatusCount.failed} files failed to upload`} style={{ marginTop: 0, fontSize: 20 }} />
					</Stack>
				}


				{!uploadFinished &&
					<Stack flex={1}>
						<Stack flex={1}>
							<MediaInputTitle title="Owner" />

							<Tooltip
								arrow
								placement="top-end"
								title="Assigning an owner to your media upload enables the media owner to select “My Media” in the media library, and filter out all media owned by them."
							>
								<Stack flex={1}>
									<SearchableSelector
										multiple
										options={teamMembers.items}
										loading={teamMembers.loading}
										value={selectedOwner}
										label="+ Add Owner (Optional)"
										placeholder="Search Owner"
										getOptionLabel={(option) => getFullName(option)}
										getChipLabel={(option) => getFullName(option)}
										getChipAvatar={(option) => option.twitter_profile?.profile_image}
										onInputChange={(event, newInputValue) => onOwnerInputChange(newInputValue)}
										onChange={onOwnerChange}
									/>
								</Stack>
							</Tooltip>
						</Stack>

						<Stack flex={1}>
							<MediaInputTitle title="Tags" />

							<Tooltip
								arrow
								placement="top-end"
								title="Add a tag to your media for better organization and easier filtering. (Think of a tag like adding media to a folder)"
							>
								<Stack flex={1}>
									<SearchableSelector
										multiple
										options={tags.items}
										loading={tags.loading}
										value={selectedTags}
										label="+ Add Tag (Optional)"
										placeholder="Search Tags"
										onChange={onTagsChange}
										getOptionLabel={(option) => option?.name || ''}
										getChipLabel={(option) => option.name}
										onInputChange={(event, newInputValue) => onTagsInputChange(newInputValue)}
										onKeyPress={onTagsKeyPress}
									/>
								</Stack>
							</Tooltip>
						</Stack>


						<Stack flex={1}>
							<MediaInputTitle title="Associate to placeholder or create new" />

							<Tooltip
								arrow
								placement="top-end"
								title="Create a new placeholder or add media to an existing placeholder for sending personalized media to contacts."
							>
								<Stack flex={1}>
									<SearchableSelector
										multiple
										options={placeholders.items}
										loading={placeholders.loading}
										value={selectedPlaceholders}
										label="+ Add Media Placeholder (For personalized media)"
										placeholder="Search Placeholder"
										onChange={onPlaceholdersChange}
										getOptionLabel={(option) => option?.name || ''}
										getChipLabel={(option) => option.name}
										onInputChange={(event, newInputValue) => onPlaceholdersInputChange(newInputValue)}
										onKeyPress={onPlaceholdersKeyPress}
									/>
								</Stack>
							</Tooltip>
						</Stack>
					</Stack>
				}

				{/* {dropFiles.length < 1 && <FileDropZone/>} */}

				{
					alerts.length > 0 &&

					alerts.map((alert, index) => (
						<Alert
							key={alert.id}
							severity="info"
							sx={{ mt: 2 }}
							onClose={() => onMediaAlertClose(index)}
						>
							{alert.message}
						</Alert>
					))
				}

				{
					files.length > 0 &&
					<div
						style={{
							marginTop: 32,
							marginBottom: 0,
							width: "100%",
							border: "1px solid #dbe2ed",
							borderRadius: 4,
						}}
					>
						<MediaUploadHeader />

						{files.map((item, index) => (
							<MediaUploadItem
								id={index}
								disableAssociateInput={uploadFinished}
								item={item}
								options={contacts.items}
								optionsLoading={contacts.loading}
								onOptionSelected={(option) => associateContactToMedia(option, index)}
								optionSelected={associatedPeople[index]}
								onRemoveOptionSelected={() => removeContactFromMedia(index)}
								itemUploadStatus={uploadStatus[index]}
								onSearch={onSearchContacts}
								onClearSearch={onClearSearchContacts}
								onDeleteMedia={() => deleteMedia(index)}
							/>
						))}
					</div>
				}

				{
					!uploadFinished &&
					<FileDropZone
						style={{ marginTop: dropFiles.length == 0 ? 30 : 0 }}
						onDrop={onDrop}
					/>
				}

			</Stack>

			<Stack direction="row" justifyContent="flex-end" margin={2}>
				<MuiButton
					onClick={onCloseMedia}
					style={{
						minWidth: 120,
						fontWeight: "bold",
						textTransform: "capitalize",
						marginRight: 10
					}}
					disableElevation
					variant="outlined"
				>
					{uploadFinished ? "Upload More" : "Cancel"}
				</MuiButton>

				<LoadingButton
					style={{
						minWidth: 120,
						backgroundColor: "#3871da",
						fontWeight: "bold",
						textTransform: "capitalize"
					}}
					onClick={onUploadMedia}
					loading={uploadingMedia}
					endIcon={uploadingMedia || uploadFinished ? <span></span> : <CloudUploadIcon style={{ color: "white" }} />}
					disableElevation
					variant="contained"
				>
					{uploadFinished ? "OK" : "Upload"}
				</LoadingButton>
			</Stack>
		</Dialog>
	)
}