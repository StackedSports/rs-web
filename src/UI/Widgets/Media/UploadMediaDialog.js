import { useState } from 'react'

import { Dialog } from "@material-ui/core"
import { Grid, Stack, debounce } from "@mui/material"

import MuiAlert from "@material-ui/lab/Alert";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button as MuiButton } from '@mui/material';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

import {
	useTeamMembers,
	useTags2,
	usePlaceholders,
	useContacts
} from 'Api/Hooks'

import {
	getAssociatedContactByFileName,
} from 'Api/Helper'

import {
	createPlaceholder,
	uploadMedia,
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
			<img src={Upload}></img>
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
	const tags = useTags2()
	const placeholders = usePlaceholders(1, 25)
	const contacts = useContacts()

	const [selectedOwner, setSelectedOwner] = useState([])
	const [selectedTags, setSelectedTags] = useState([])
	const [selectedPlaceholders, setSelectedPlaceholders] = useState([])

	const [uploadStatus, setUploadStatus] = useState(dummyUploadProgress)
	const [uploadingMedia, setUploadingMedia] = useState(false)

	// Media
	const [dropFiles, setDropFiles] = useState(dummyFiles);

	// Upload Process
	const [uploadStatusCount, setUploadStatusCount] = useState({ success: 13, failed: 5, total: 18 })
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
								setAlerts.push("One or more files were not associated to a contact based on their file name because the search for contact returned with multiple contacts")
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

	const handleImportFiles = (files) => {
		let tempFiles = []
		let tempAssociated = []
		let tempUploadStatus = []

		let pushedCount = 0

		for (let i = 0; i < files.length; i++) {
			let file = files[i]

			//console.log(file)

			if (((file.type.includes("/jpg") || file.type.includes("/jpeg") || file.type.includes("/png")) && file.size < 5000000)
				|| ((file.type.includes("/pdf") || file.type.includes("/mp4")) && file.size < 15000000)) {
				// 5MB for images and 15MB for videos

				//console.log(file.name + "*")

				tempFiles.push(file)
				tempAssociated.push("loading")
				tempUploadStatus.push("none")
            }
        }

        if (files.length != tempFiles.length) {
            setAlerts.push("One or more files were not added since they do not match the file upload criteria")

            // setMediaAlert({
            //   message: ,
            //   visible: true
            // })
        }

        const initialAssociated = Object.assign([], associatedPeople)
        const initialUploadStatus = Object.assign([], uploadStatus)

        handleAssociateContactToFile(tempFiles, tempAssociated, tempUploadStatus)   
            .then(() => {

                //console.log(tempFiles)
                //console.log(tempAssociated)

                setAssociatedPeople(initialAssociated.concat(tempAssociated))
                setUploadStatus(initialUploadStatus.concat(tempUploadStatus))
                // setDropFiles(dropFiles.concat(tempFiles));
            })

        setAssociatedPeople(associatedPeople.concat(tempAssociated))
        setDropFiles(dropFiles.concat(tempFiles));
        setUploadStatus(uploadStatus.concat(tempUploadStatus))
        // setAssociatedPeople(associated)
        // setDropFiles(tempFiles);
    }

    const handleFileChange = (e) => {
        handleImportFiles(e.target.files)
        return
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

		// TODO: uncomment this
		// if (dropFiles.length == 0) {
		// 	setAlerts.push("You forgot to import media files to upload")
		// 	return
		// }

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
			console.log(selectedPlaceholders[0])

			setUploadingMedia(true)

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
		let tempUploadStatus = Object.assign([], uploadStatus)

		let count = dropFiles.length

		let failedCount = 0
		let successCount = 0

		setUploadingMedia(true)

		dropFiles.forEach((file, index) => {
			let media = {
				file,
				owner: selectedOwner[0]?.id.toString(),
				placeholder: withPlaceholder || selectedPlaceholders[0]?.id.toString(),
				contact: associatedPeople[index]?.id.toString(),
				selectedTags: selectedTags
			}

			// console.log("upload " + index)
			console.log(media)

			//return

			tempUploadStatus[index] = "uploading"
			setUploadStatus(tempUploadStatus)

			// TODO: create new placeholder if selectedPlaceholders id contains 'new-'

			uploadMedia(media)
				.then(res => {
					// console.log(res)

					let mediaRes = res

					let temp2 = Object.assign([], tempUploadStatus)
					tempUploadStatus[index] = "success"
					temp2[index] = "success"
					setUploadStatus(temp2)
					// console.log(temp2)

					successCount++

					selectedTags.forEach(tag => {
						//if(typeof tag.id == "string" && tag.id.includes("new-")) {
						addTagToMedia(mediaRes.id, tag.name)
							.then(res => {
								//console.log(res)
							})
							.catch(error => {
								//console.log(error)
							})
						//}
					})

					// last id 314852
				})
				.catch(error => {
					// console.log(error)

					let temp2 = Object.assign([], tempUploadStatus)
					temp2[index] = "failed"
					tempUploadStatus[index] = "failed"
					setUploadStatus(temp2)
					// console.log(temp2)

					failedCount++

					//tempUploadStatus[index] = "failed"
					//setUploadStatus(tempUploadStatus)
				})
				.finally(() => {
					//setUploadStatus(tempUploadStatus)
					count--

					if (count == 0) {
						setUploadingMedia(false)
						onUploadFinished(tempUploadStatus, successCount, failedCount, dropFiles.length)
					}
				})
		})
	}

	const onUploadFinished = (tempUploadStatus, successCount, failedCount, totalCount) => {
		let tmp = []

		tempUploadStatus.forEach((status, index) => {
			if (status === 'failed')
				tmp.push(dropFiles[index])
		})

		setFailedUploads(tmp)
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

	const Alert = (props) => {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const onOwnerChange = (owner) => {
		if (owner.length <= 1) {
			setSelectedOwner(owner)
		} else {
			setSelectedOwner([owner[owner.length - 1]])
		}
	}

	const onOwnerInputChange = debounce((value) => {
		if (value && value !== ' ') {
			teamMembers.filter({ search: value })
		} else {
			teamMembers.clearFilter()
		}
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

	const onTagsInputChange = debounce(input => {
		if (input && input !== '')
			tags.search(input)
		else
			tags.clearSearch()
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
			fullWidth={true}
			scroll={"body"}
			open={props.open}
			onClose={props.onClose}
		>
			<input
				type="file"
				name="image"
				id={"browse"}
				className="form-control"
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

							<SearchableSelector
								multiple
								options={teamMembers.items}
								loading={teamMembers.loading}
								value={selectedOwner}
								label="+ Add Owner"
								placeholder="Search Owner"
								getOptionLabel={(option) => getFullName(option)}
								getChipLabel={(option) => getFullName(option)}
								getChipAvatar={(option) => option.twitter_profile?.profile_image}
								onInputChange={(event, newInputValue) => onOwnerInputChange(newInputValue)}
								onChange={onOwnerChange}
							/>
						</Stack>
						<Stack flex={1}>
							<MediaInputTitle title="Tags" />

							<SearchableSelector
								multiple
								options={tags.items}
								loading={tags.loading}
								value={selectedTags}
								label="+ Add Tag"
								placeholder="Search Tags"
								onChange={onTagsChange}
								getOptionLabel={(option) => option?.name || ''}
								getChipLabel={(option) => option.name}
								onInputChange={(event, newInputValue) => onTagsInputChange(newInputValue)}
								onKeyPress={onTagsKeyPress}
							/>
						</Stack>

						<Stack flex={1}>
							<MediaInputTitle title="Associate to placeholder or create new" />

							<SearchableSelector
								multiple
								options={placeholders.items}
								loading={placeholders.loading}
								value={selectedPlaceholders}
								label="+ Add Media Placeholder"
								placeholder="Search Placeholder"
								onChange={onPlaceholdersChange}
								getOptionLabel={(option) => option?.name || ''}
								getChipLabel={(option) => option.name}
								onInputChange={(event, newInputValue) => onPlaceholdersInputChange(newInputValue)}
								onKeyPress={onPlaceholdersKeyPress}
							/>
						</Stack>
					</Stack>
				}

				{/* {dropFiles.length < 1 && <FileDropZone/>} */}

				{alerts.length > 0 &&
					<div
						style={{
							// marginTop: 16,
							transform: "translateY(15px)",
							marginBottom: 0,
							width: "100%",
							border: "1px solid #dbe2ed",
							borderRadius: 4,
						}}
					>
						{alerts.map((alert, index) => (
							<Alert key={alert.id}
								style={{ boxShadow: "0 0 transparent" }}
								variant="standard"
								severity="warning"
								onClose={() => onMediaAlertClose(index)}
							>
								{alert.message}
							</Alert>
						))}
					</div>
				}

				{files.length > 0 &&
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

				{!uploadFinished &&
					<FileDropZone
						style={{ marginTop: dropFiles.length == 0 ? 30 : 0 }}
						onDrop={onDrop}
					/>
				}

				<Grid item md={5} xs={5}></Grid>

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
					// color="#3871da"
					variant="contained"
				>
					{uploadFinished ? "OK" : "Upload"}
				</LoadingButton>
			</Stack>
		</Dialog>
	)
}