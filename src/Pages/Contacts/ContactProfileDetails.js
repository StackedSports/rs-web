import { useState, useEffect, useMemo, useContext } from 'react';
import { Formik, Form } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// import Button as ButtonMUI from '@mui/material/Button';
import { Collapse, List, ListItem } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import * as Yup from "yup";
import { parse, isDate, subYears } from "date-fns";

import AccordionComponent from 'UI/Widgets/Accordion';
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector';
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import CreatePersonDialog from 'UI/Widgets/Contact/CreatePersonDialog';
import CreateOpponentDialog from 'UI/Widgets/Contact/CreateOpponentDialog';
import DatePicker from 'UI/Forms/Inputs/DatePicker';

import { states } from 'utils/Data';
import {
	useTeamMembers,
	usePositions,
	useStatuses,
	useRanks,
	useStatus2,
} from 'Api/Hooks'

import { useTags } from 'Api/ReactQuery';

import {
	addTagsToContact,
	untagContact,
	updateContact,
} from 'Api/Endpoints'

import { AppContext } from 'Context/AppProvider'

import { formatPhoneNumber, getFullName } from 'utils/Parser';
import { objectNotNull } from 'utils/Validation'
import { getStringListOfIds } from 'utils/Helper'
import Button from 'UI/Widgets/Buttons/Button';
import PeopleDialog from 'UI/Widgets/Dialogs/PeopleDialog';

const regexPhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const formValidation = Yup.object().shape({
	phone: Yup.string().matches(regexPhoneNumber, {
		message: "Invalid phone number"
	}),
	// email: Yup.string().email("Invalid email"),
})

const detailsFormValidation = Yup.object().shape({
	dob: Yup.date()
		.max(new Date(), "Date of birth must be in the past")
		.min(subYears(new Date(), 120), `Min date is ${subYears(new Date(), 120)}`)
		.typeError("Format must be MM/DD/YYYY")
})

const ContactProfileDetails = (props) => {
	if (props.loading)
		return (
			<Stack
				pr={1}
				spacing={1}
				sx={{ width: '350px', height: '100%', overflowY: "auto", borderRight: "#efefef  1px solid" }}
			>
				<LoadingPanel />
			</Stack>
		)

	const app = useContext(AppContext)

	const [expandedAccordionId, setExpandedAccordion] = useState()
	const [savingContact, setSavingContact] = useState([false, false, false, false, false, false, false, false])
	const [showSaveButton, setShowSaveButton] = useState([false, false, false, false, false, false, false, false])
	const [openNewFamilyMemberDialog, setOpenNewFamilyMemberDialog] = useState(false)
	const [openPeopleDialog, setOpenPeopleDialog] = useState(false)
	const [familyMember, setFamilyMember] = useState(null)
	const [openNewOpponentDialog, setOpenNewOpponentDialog] = useState(false)

	const [openCollapsePeople, setOpenCollapsePeople] = useState(false)

	const teamMembers = useTeamMembers()
	const positions = usePositions()
	const status = useStatuses()
	const status2 = useStatus2()
	const ranks = useRanks()
	const tags = useTags()

	console.log(status2)

	useEffect(() => {
		if (props.contact)
			console.log(props.contact)
	}, [props.contact])

	const initialValues = useMemo(() => ({
		general: {
			first_name: props.contact?.first_name || "",
			last_name: props.contact?.last_name || "",
			nick_name: props.contact?.nick_name || "",
			phone: props.contact?.phone ? formatPhoneNumber(props.contact.phone) : "",
			email: props.contact?.email,
			twitter_handle: props.contact?.twitter_profile?.screen_name || "",
		},
		details: {
			dob: props.contact?.dob && props.contact.dob.replaceAll("-", "/"),
			graduation_year: props.contact?.grad_year,
			high_school: props.contact?.high_school,
			state: props.contact?.state,
			status: props.contact?.status?.status,
			status_2: props.contact?.status_2 || "",
			rank: props.contact?.rank?.rank,
		},
		coaches: {
			position_coach: props.contact?.position_coach,
			recruiting_coach: props.contact?.area_coach,
			coordinator: props.contact?.coordinator,
		},
		positions: {
			position_tags: props.contact?.positions?.map(p => p.toUpperCase()) || [],
		},
		relationships: {
			relationships: props.contact?.relationships || "",
		},
		opponents: {
			opponents: props.contact?.opponents || "",
		},
		external: {
			hudl_link: props.contact?.hudl || "",
			arms_id: props.contact?.arms_id || "",
		},
		tags: {
			tags: props.contact?.tags || [],
		}
	}), [props.contact])

	useEffect(() => {
		// console.log(savingContact)
	}, [savingContact])

	useEffect(() => {
		// console.log(showSaveButton)
	}, [showSaveButton])

	const parseValues = (data) => {
		let newData = {}

		Object.keys(data).forEach(key => {
			switch (key) {
				case 'status':
				case 'rank':
				case 'position_coach':
				case 'recruiting_coach':
				case 'coordinator':
					newData[`${key}_id`] = data[key]?.id || ''
					break
				// case 'position_tags':
				// 	newData[key] = data[key].map(position => {
				// 		if (typeof position === 'string')
				// 			return position
				// 		else
				// 			return position.abbreviation
				// 	})
				// 	break
				default:
					newData[key] = data[key] || ''
			}
		})

		return newData
	}

	const onUpdateContact = (values, control, index) => {
		console.log(values)

		let data = getOnlyNewValues(initialValues[control], values)
		// console.log('aa')
		console.log(data)
		console.log(parseValues(data))

		if (!objectNotNull(data))
			return app.alert.setInfo('No fields have changed, did not update profile')

		console.log('saving contact')

		setSavingContactAtIndex(index, true)

		updateContact(props.contact.id, parseValues(data))
			.then(res => {
				props.onContactUpdated(res.data)
				app.alert.setSuccess('Contact updated successfully!')
				onAccordionFieldReset(index)
				console.log(res.data)
			})
			.catch(error => {
				console.log(error)
				app.alert.setError('Contact failed to update.')
				// re(error)
			})
			.finally(() => setSavingContactAtIndex(index, false))

		// return new Promise((resolve, reject) => {

		// })
	}

	const getOnlyNewValues = (previous, current) => {
		// console.log('getOnlyNewValues')
		let newValues = {}
		// console.log('looping')

		Object.keys(previous).forEach(key => {
			// console.log('for ' + key)
			if (previous[key] !== current[key]) {
				// console.log('key different')
				newValues[key] = current[key]
			}
		})

		// console.log('returning')
		return newValues
	}

	const onUpdateGeneral = (values, actions) => {
		onUpdateContact(values, 'general', 0)
	}

	const onUpdateDetails = (values, actions) => {
		console.log(values)
		onUpdateContact(values, 'details', 1)
	}

	const onUpdateCoaches = (values, actions) => {
		onUpdateContact(values, 'coaches', 2)
	}

	const onUpdatePositions = (values, actions) => {
		console.log(values)
		console.log(initialValues.positions)

		let data = {
			// include: ['ca', 'ba'],
			// exclude: ['as']
		}

		console.log('hello')

		// Add position from values (formik) to our data object
		// if they don't already exist in the initial position values
		values.position_tags.forEach(newPosition => {
			let found = false

			initialValues.positions.position_tags.every(currentPosition => {
				if (newPosition === currentPosition) {
					found = true
					return false
				}

				return true
			})

			if (!found) {
				if (!data.include)
					data['include'] = []

				data.include.push(newPosition)
			}
		})

		// Add position to remove if they are present in initial values
		// but are not present in values
		initialValues.positions.position_tags.forEach(currentPosition => {
			let found = false

			values.position_tags.every(newPosition => {
				if (newPosition === currentPosition) {
					found = true
					return false
				}

				return true
			})

			if (!found) {
				if (!data.exclude)
					data['exclude'] = []

				data.exclude.push(currentPosition)
			}
		})

		console.log(data)


		// return
		onUpdateContact({ position_tags: data }, 'positions', 3)
	}

	const parsedPositions = useMemo(() => {
		if (!positions.items)
			return []

		return positions.items.map(position => position.abbreviation)
	}, [positions.items])

	const onUpdateRelationships = (values, actions) => {
		onUpdateContact(values, 'relationships', 4)
	}

	const onUpdateOpponents = (values, actions) => {
		onUpdateContact(values, 'opponents', 5)
	}

	const onUpdateExternal = (values, actions) => {
		onUpdateContact(values, 'external', 6)
	}

	const onUpdateTags = (values, actions) => {

		console.log(values)
		console.log(initialValues.tags)
		const indexAccordion = 7
		let data = {
			// includeTagsIds: ['379', '15110'],
			// excludeTagsIds: ['14834']
		}

		values.tags.forEach(newTag => {
			let found = false

			initialValues.tags.tags.every(currentTag => {
				if (newTag === currentTag) {
					found = true
					return false
				}

				return true
			})

			if (!found) {
				if (!data.includeTagsIds)
					data['includeTagsIds'] = []

				data.includeTagsIds.push(newTag.id)
			}
		})

		initialValues.tags.tags.forEach(currentTag => {
			let found = false

			values.tags.every(newTag => {
				if (newTag === currentTag) {
					found = true
					return false
				}

				return true
			})

			if (!found) {
				if (!data.excludeTagsIds)
					data['excludeTagsIds'] = []

				data.excludeTagsIds.push(currentTag.id)
			}
		})

		//console.log(data)

		if (data.includeTagsIds) {
			console.log("includeTagsIds", data.includeTagsIds)
			setSavingContactAtIndex(indexAccordion, true)
			addTagsToContact(data.includeTagsIds, props.contact.id)
				.then(res => {
					props.onContactUpdated({ ...props.contact, tags: values.tags })
					app.alert.setSuccess('Contact updated successfully!')
					onAccordionFieldReset(indexAccordion)
				})
				.catch(error => {
					console.log(error)
					app.alert.setError('Contact failed to update.')
				})
				.finally(() => setSavingContactAtIndex(indexAccordion, false))
		}

		if (data.excludeTagsIds) {
			console.log("excludeTagsIds", data.excludeTagsIds)
			setSavingContactAtIndex(indexAccordion, true)
			untagContact(data.excludeTagsIds, props.contact.id)
				.then(res => {
					props.onContactUpdated({ ...props.contact, tags: values.tags })
					app.alert.setSuccess('Contact updated successfully!')
					onAccordionFieldReset(indexAccordion)
				})
				.catch(error => {
					console.log(error)
					app.alert.setError('Contact failed to update.')
				})
				.finally(() => setSavingContactAtIndex(indexAccordion, false))
		}

	}

	const onAccordionFieldChange = (index) => {
		setShowSaveButton(oldValue => {
			let tmp = Object.assign([], oldValue)
			tmp[index] = true
			return tmp
		})
	}

	const onAccordionFieldReset = (index) => {
		setShowSaveButton(oldValue => {
			let tmp = Object.assign([], oldValue)
			tmp[index] = false
			return tmp
		})
	}

	const setSavingContactAtIndex = (index, value) => {
		setSavingContact(oldValue => {
			let tmp = Object.assign([], oldValue)
			tmp[index] = value
			return tmp
		})
	}

	const onFieldChange = (e, index, formikProps) => {
		onAccordionFieldChange(index)
		// formikProps.handleChange(e)//
	}

	const onDiscard = (e, index, formikProps) => {
		e.stopPropagation()
		onAccordionFieldReset(index)
		formikProps.resetForm()
	}

	const onSuccessRelationship = (relationship) => {
		if (familyMember) {
			console.log("relationship updated ", relationship)
			app.alert.setSuccess(`Relationship updated: ${relationship?.relationship_type?.description}: ${getFullName(relationship)} !`)
		} else {
			console.log("new relationship Created ", relationship)
			app.alert.setSuccess(`New relationship created: ${relationship?.relationship_type?.description}: ${getFullName(relationship)} !`)
		}
		props.refreshContact()
	}

	const onViewPerson = (person) => {
		setFamilyMember(person)
		console.log(person)
		setOpenNewFamilyMemberDialog(true)
	}

	const onStatus2Change = (setFieldValue, value) => {
		console.log(value)
		onAccordionFieldChange(1)
		setFieldValue('status_2', value)
	}

	return (
		<Stack
			pr={1}
			spacing={1}
			sx={{ width: '350px', height: '100%', overflowY: "auto", borderRight: "#efefef  1px solid" }}
		>
			<CreatePersonDialog
				open={openNewFamilyMemberDialog}
				onClose={() => setOpenNewFamilyMemberDialog(false)}
				contact={props.contact}
				onSuccess={onSuccessRelationship}
				person={familyMember}
			/>

			<CreateOpponentDialog
				open={openNewOpponentDialog}
				onClose={() => setOpenNewOpponentDialog(false)}
				contact={props.contact}
			//onCreated ={onOpponentCreated  }
			/>

			<PeopleDialog
				open={openPeopleDialog}
				onViewPerson={onViewPerson}
				people={props.contact?.relationships}
				onClose={setOpenPeopleDialog}
			/>

			<Formik
				initialValues={initialValues.general}
				onSubmit={onUpdateGeneral}
				validationSchema={formValidation}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='general'
							id='general'
							title='GENERAL'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[0]}
							showButtonSummary
							showSaveButton={showSaveButton[0]}
							onFieldChange={(e) => onFieldChange(e, 0, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 0, formikProps)}
							items={[
								{ label: 'First Name', name: 'first_name', value: formikProps.values.first_name, component: TextField },
								{ label: 'Last Name', name: 'last_name', value: formikProps.values.last_name, component: TextField },
								{ label: 'Nick Name', name: 'nick_name', value: formikProps.values.nick_name, component: TextField },
								{ label: 'Phone Number', name: 'phone', type: "tel", value: formikProps.values.phone, component: TextField, error: formikProps.errors.phone, touch: formikProps.touched.phone },
								{ label: 'Email', name: 'email', type: "email", value: formikProps.values.email, component: TextField, error: formikProps.errors.email, touch: formikProps.touched.email },
								{ label: 'Twitter Handle', name: 'twitter_handle', value: formikProps.values.twitter_handle, component: TextField },
							]}
						/>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.details}
				onSubmit={onUpdateDetails}
				validationSchema={detailsFormValidation}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='details'
							id='details'
							title='DETAILS'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[1]}
							showButtonSummary
							showSaveButton={showSaveButton[1]}
							onFieldChange={(e) => onFieldChange(e, 1, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 1, formikProps)}
							items={[

								{
									label: 'Graduation Year',
									name: 'graduation_year',
									type: "number",
									value: formikProps.values.graduation_year,
									component: TextField
								},
								{
									label: 'Current School',
									name: 'high_school',
									value: formikProps.values.high_school,
									component: TextField,
								},
							]}
						>
							<DatePicker
								label='Birthday'
								name='dob'
								format='MM/dd/yyyy'
								disableFuture
								minDate={subYears(new Date(), 120)}
								value={formikProps.values.dob}
								onChange={(e) => {
									formikProps.setFieldValue('dob', e, true)
									onAccordionFieldChange(1)
								}}
								helperText={formikProps.errors.dob ? formikProps.errors.dob : ''}
							/>
							<SearchableSelector
								label="State"
								placeholder="Search"
								value={formikProps.values.state}
								options={states || []}
								isOptionEqualToValue={(option, value) => option?.abbreviation === value}
								getOptionLabel={(option) => option.abbreviation || option || ""}
								getChipLabel={(option) => option.abbreviation}
								onChange={(newValue) => {
									console.log(newValue)
									formikProps.setFieldValue("state", newValue?.abbreviation)
									onAccordionFieldChange(1)
								}}
								clearOnBlur
							/>

							<SearchableSelector
								label="Status"
								placeholder="Search"
								// multiple
								value={formikProps.values.status}
								options={status.items || []}
								loading={status.loading}
								isOptionEqualToValue={(option, value) => option?.status === value}
								getOptionLabel={(option) => option.status || option || ""}
								onChange={(newValue) => {
									console.log(newValue)
									formikProps.setFieldValue('status', newValue)
									onAccordionFieldChange(1)
								}}
								clearOnBlur
							/>

							<SearchableSelector
								label="Status2"
								placeholder="Search"
								// multiple
								value={formikProps.values.status_2}
								options={status2.items || []}
								loading={status2.loading}
								isOptionEqualToValue={(option, value) => option === value}
								getOptionLabel={(option) => option || ""}
								onInputChange={(e, newValue) => {
									onStatus2Change(formikProps.setFieldValue, newValue)
								}}
								onChange={(newValue) => {
									// console.log(newValue)
									// formikProps.setFieldValue('status_2', newValue)
									// onAccordionFieldChange(1)
									onStatus2Change(formikProps.setFieldValue, newValue)
								}}
								clearOnBlur
							/>

							<SearchableSelector
								label="Rank"
								placeholder="Search"
								// multiple
								value={formikProps.values.rank}
								options={ranks.items || []}
								loading={ranks.loading}
								isOptionEqualToValue={(option, value) => option?.rank === value}
								getOptionLabel={(option) => option.rank || option}
								getChipLabel={(option) => option.rank}
								onChange={(newValue) => {
									formikProps.setFieldValue('rank', newValue)
									onAccordionFieldChange(1)
								}}
								clearOnBlur
							/>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.coaches}
				onSubmit={onUpdateCoaches}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='coaches'
							id='coaches'
							title='COACHES'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[2]}
							showButtonSummary
							showSaveButton={showSaveButton[2]}
							onDiscard={(e) => onDiscard(e, 2, formikProps)}
						>

							<SearchableSelector
								label="Position Coach"
								placeholder="Search"
								value={formikProps.values.position_coach}
								options={teamMembers.items || []}
								loading={teamMembers.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => getFullName(option)}
								getChipLabel={(option) => getFullName(option)}
								onChange={(newValue) => {
									formikProps.setFieldValue("position_coach", newValue)
									onAccordionFieldChange(2)
								}}
								clearOnBlur
							/>

							<SearchableSelector
								label="Area Coach"
								placeholder="Search"
								value={formikProps.values.recruiting_coach}
								options={teamMembers.items || []}
								loading={teamMembers.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => getFullName(option)}
								getChipLabel={(option) => getFullName(option)}
								onChange={(newValue) => {
									formikProps.setFieldValue("recruiting_coach", newValue)
									onAccordionFieldChange(2)
								}}
								clearOnBlur
							/>

							<SearchableSelector
								label="Coordinator"
								placeholder="Search"
								value={formikProps.values.coordinator}
								options={teamMembers.items || []}
								loading={teamMembers.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => getFullName(option)}
								getChipLabel={(option) => getFullName(option)}
								onChange={(newValue) => {
									formikProps.setFieldValue("coordinator", newValue)
									onAccordionFieldChange(2)
								}}
								clearOnBlur
							/>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.positions}
				onSubmit={onUpdatePositions}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='positions'
							id='positions'
							title='POSITIONS'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[3]}
							showButtonSummary
							showSaveButton={showSaveButton[3]}
							onDiscard={(e) => onDiscard(e, 3, formikProps)}
						>
							<SearchableSelector
								label="Positions"
								placeholder="Search"
								variant="contained"
								multiple
								value={formikProps.values.position_tags}
								options={parsedPositions}
								loading={positions.loading}
								isOptionEqualToValue={(option, value) => option === value}
								getOptionLabel={(option) => option.abbreviation || option}
								getChipLabel={(option) => option.abbreviation || option}
								onChange={(newValue) => {
									console.log('on change', newValue)
									formikProps.setFieldValue("position_tags", newValue)
									onAccordionFieldChange(3)
								}}
								clearOnBlur
							/>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.relationships}
				onSubmit={onUpdateRelationships}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='relationships'
							id='family-relationship'
							title='FAMILY & RELATIONSHIP'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[4]}
							showButtonSummary
							showSaveButton={showSaveButton[4]}
							onFieldChange={(e) => onFieldChange(e, 4, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 4, formikProps)}
							items={[
								// { label: 'People', name: 'relationships', value: formikProps.values.relationships, component: TextField },
							]}
						>
							<Button
								name="Add new relationship"
								type="button"
								variant='contained'
								onClick={() => { setOpenNewFamilyMemberDialog(true); setFamilyMember(null) }}
							/>

							<List
								style={{
									display: "flex",
									flexDirection: "column",
									// width: "100%",
									// position: "absolute",
									// zIndex: 1000,
									// backgroundColor: "#ffff"
								}}
							>
								{props.contact?.relationships?.filter((person, index) => index < 3 && person)
									.map(person => {
										return (
											<ListItemButton
												key={person.id}
												onClick={() => onViewPerson(person)}
											>
												<Stack direction="row" flex={1}>
													<Stack flex={1}>{person.first_name + " " + person.last_name}</Stack>
													<Stack>{person.relationship_type.description}</Stack>
												</Stack>
											</ListItemButton>
										)
									})
								}
								{props.contact?.relationships?.length > 3 &&
									<Button
										style={{
											alignSelf: "center",
											width: "max-content",
										}}
										type="button"
										name="View More..."
										variant='outlined'
										// endIcon={<MoreHorizIcon />}
										onClick={() => setOpenPeopleDialog(true)}
									/>
								}
							</List>
							{/* <Button
								name="View People"
								type="button"
								variant='contained'
								endIcon={<ArrowDropDownIcon />}
								onClick={() => setOpenCollapsePeople(!openCollapsePeople)}
							/>
							<Collapse
								style={{
									position: "relative",
								}}
								timeout="auto"
								unmountOnExit
								in={openCollapsePeople}
							>
								
							</Collapse> */}

						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.opponents}
				onSubmit={onUpdateOpponents}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='opponents'
							id='opponents'
							title='OPPONENTS'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[5]}
							showButtonSummary
							showSaveButton={showSaveButton[5]}
							onFieldChange={(e) => onFieldChange(e, 5, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 5, formikProps)}
							items={[
								{ label: 'Opponents', name: 'opponents', value: formikProps.values.opponents, component: TextField },
							]}
							clearOnBlur
						>
							<Button
								name="Add new opponent"
								type="button"
								variant='contained'
								onClick={() => setOpenNewOpponentDialog(true)}
							/>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.external}
				onSubmit={onUpdateExternal}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='external'
							id='external-profiles'
							title='EXTERNAL PROFILES'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[6]}
							showButtonSummary
							showSaveButton={showSaveButton[6]}
							onFieldChange={(e) => onFieldChange(e, 6, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 6, formikProps)}
							items={[
								{ label: 'Hudl', name: 'hudl_link', value: formikProps.values.hudl_link, component: TextField },
								{ label: 'Arms Id', name: 'arms_id', value: formikProps.values.arms_id, component: TextField },
							]}
						/>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.tags}
				onSubmit={onUpdateTags}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='tags'
							id='tags'
							title='TAGS'
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[7]}
							showButtonSummary
							showSaveButton={showSaveButton[7]}
							onDiscard={(e) => onDiscard(e, 7, formikProps)}
						>
							<SearchableSelector
								label="Tags"
								placeholder="Search"
								variant="contained"
								multiple
								value={formikProps.values.tags}
								options={tags.items || []}
								loading={tags.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => option.name || ""}
								getChipLabel={(option) => option.name || ''}
								onChange={(newValue) => {
									console.log(newValue)
									formikProps.setFieldValue('tags', newValue)
									onAccordionFieldChange(7)
								}}
								clearOnBlur
							/>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<AccordionComponent
				key='actions'
				id='actions'
				title='ACTIONS'
				expandedId={expandedAccordionId}
				setExpanded={setExpandedAccordion}
			// saving={savingContact[0]}
			// showButtonSummary
			// onFieldChange={handleChange}
			// onFieldValue={setFieldValue}
			// items={[
			// 	{ label: 'Archive', name: 'archived', value: values.archived, component: TextField },
			// ]}
			/>
		</Stack>
	)
}

export default ContactProfileDetails;