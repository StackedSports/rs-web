import { useState, useEffect, useMemo, useContext } from 'react';
import { Formik, Form } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { ListItemButton, List, ListItem, Box } from '@mui/material';
import * as Yup from "yup";
import { subYears } from "date-fns";
import lodash from 'lodash'

import AccordionComponent from 'UI/Widgets/Accordion';
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector';
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import CreatePersonDialog from 'UI/Widgets/Contact/CreatePersonDialog';
import CreateOpponentDialog from 'UI/Widgets/Contact/CreateOpponentDialog';
import DatePicker from 'UI/Forms/Inputs/DatePicker';
import { states, timeZones } from 'utils/Data';
import { useStatus2, useStatuses, useRanks, usePositions, useTeamMembers, useTags, useContactMutation } from 'Api/ReactQuery';

import {
	addTagsToContact,
	untagContact,
} from 'Api/Endpoints'
import { AppContext } from 'Context/AppProvider'

import { formatPhoneNumber, getFullName } from 'utils/Parser';
import { objectNotNull } from 'utils/Validation'
import Button from 'UI/Widgets/Buttons/Button';
import PeopleDialog from 'UI/Widgets/Dialogs/PeopleDialog';
import OpponentDialog from 'UI/Widgets/Dialogs/OpponentDialog';
import { PreferencesContext } from 'Context/PreferencesProvider';

const regexPhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const formValidation = Yup.object().shape({
	phone: Yup.string().matches(regexPhoneNumber, {
		message: "Invalid phone number"
	}),
	// email: Yup.string().email("Invalid email"),
})

const detailsFormValidation = Yup.object().shape({
	dob: Yup.date()
		.nullable()
		.max(new Date(), "Date of birth must be in the past")
		.min(subYears(new Date(), 120), `Min date is ${subYears(new Date(), 120)}`)
		.typeError("Format must be MM/DD/YYYY"),
	ets_code: Yup.number("ETS code must be a number"),
})

const ContactProfileDetails = (props) => {
	const app = useContext(AppContext)
	const preferences = useContext(PreferencesContext)
	const labels = useMemo(() => {
		const preferenceMap = new Map(preferences?.labels)
		return {
			'full_name': preferenceMap.get('full_name')?.label || '',
			'first_name': preferenceMap.get('first_name')?.label || '',
			'last_name': preferenceMap.get('last_name')?.label || '',
			'twitter_profile': preferenceMap.get('twitter_profile')?.label || '',
			'dob': preferenceMap.get('dob')?.label || '',
			'phone': preferenceMap.get('phone')?.label || '',
			'nick_name': preferenceMap.get('nick_name')?.label || '',
			'state': preferenceMap.get('state')?.label || '',
			'high_school': preferenceMap.get('high_school')?.label || '',
			'grad_year': preferenceMap.get('grad_year')?.label || '',
			'relationships': preferenceMap.get('relationships')?.label || 'FAMILY & RELATIONSHIP',
			'opponents': preferenceMap.get('opponents')?.label || '',
			'positions': preferenceMap.get('positions')?.label || '',
			'area_coach': preferenceMap.get('area_coach')?.label || '',
			'position_coach': preferenceMap.get('position_coach')?.label || '',
			'coordinator': preferenceMap.get('coordinator')?.label || '', //recruiting coach
			'status': preferenceMap.get('status')?.label || '',
			'status_2': preferenceMap.get('status_2')?.label || '',
			'tags': preferenceMap.get('tags')?.label || '',
			'rank': preferenceMap.get('rank')?.label || '',
			'time_zone': preferenceMap.get('time_zone')?.label || '',
		}
	}, [preferences])

	const { update: updateContact, archive } = useContactMutation()

	const [expandedAccordionId, setExpandedAccordion] = useState()
	const [savingContact, setSavingContact] = useState([false, false, false, false, false, false, false, false])
	const [showSaveButton, setShowSaveButton] = useState([false, false, false, false, false, false, false, false])
	const [openNewFamilyMemberDialog, setOpenNewFamilyMemberDialog] = useState(false)
	const [openPeopleDialog, setOpenPeopleDialog] = useState(false)
	const [familyMember, setFamilyMember] = useState(null)
	const [openNewOpponentDialog, setOpenNewOpponentDialog] = useState(false)
	const [opponent, setOpponent] = useState(null)
	const [openOpponentDialog, setOpenOpponentDialog] = useState(false)

	const teamMembers = useTeamMembers()
	const positions = usePositions()
	const status = useStatuses()
	const status2 = useStatus2()
	const ranks = useRanks()
	const tags = useTags()

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
			status: props.contact?.status,
			status_2: props.contact?.status_2 || "",
			rank: props.contact?.rank,
			ets_code: props.contact?.ets_code || "",
			time_zone: props.contact?.time_zone,
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

	const parseValues = (data) => {
		let newData = {}

		Object.keys(data).forEach(key => {
			switch (key) {
				case 'status':
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
				case 'time_zone':
					newData[key] = data[key].name
					break
				case 'rank':
					newData[`${key}_id`] = data[key].id
					break
				default:
					newData[key] = data[key] || ''
					break
			}
		})

		return newData
	}

	const onUpdateContact = (values, control, index) => {
		console.log(values)
		let data = getOnlyNewValues(initialValues[control], values)
		console.log(data)
		console.log(parseValues(data))

		if (!objectNotNull(data))
			return app.alert.setInfo('No fields have changed, did not update profile')

		console.log('saving contact')

		// return

		setSavingContactAtIndex(index, true)
		const updateData = parseValues(data)

		updateContact({ id: props.contact.id, data: updateData }, {
			onSuccess: (res) => {

				let countEqual = 0
				let countDif = 0
				const totalUpdate = Object.keys(updateData).length

				Object.keys(props.contact)
					.forEach(key => {
						if (lodash.isEqual(props.contact[key], res.data[key]))
							countEqual++
						else {
							countDif++
						}
					})

				if (countDif === 0) {
					app.alert.setError('Contact update failed!')
				} else if (countDif === totalUpdate) {
					props.onContactUpdated(res.data)
					app.alert.setSuccess('Contact updated successfully!')
					onAccordionFieldReset(index)
				} else {
					app.alert.setWarning('Some fields failed to update!')
					onAccordionFieldReset(index)
					props.onContactUpdated(res.data)
				}

			},
			onError: (error) => {
				console.log(error)
				app.alert.setError('Contact failed to update.')
			},
			onSettled: () => {
				setSavingContactAtIndex(index, false)
			}
		})

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
			//console.log("relationship updated ", relationship)
			app.alert.setSuccess(`Relationship updated: ${relationship?.relationship_type?.description}: ${getFullName(relationship)} !`)
		} else {
			//console.log("new relationship Created ", relationship)
			app.alert.setSuccess(`New relationship created: ${relationship?.relationship_type?.description}: ${getFullName(relationship)} !`)
		}
		props.refreshContact()
	}

	const onSuccessOpponent = (type) => {
		console.log("opponent updated ")
		if (opponent) {
			if (type === 'removed')
				app.alert.setSuccess(`Opponent removed!`)
			else
				app.alert.setSuccess(`Opponent updated!`)
		} else
			app.alert.setSuccess(`New opponent created!`)
		props.refreshContact()
	}

	const onViewPerson = (person) => {
		setFamilyMember(person)
		console.log(person)
		setOpenNewFamilyMemberDialog(true)
	}
	const onViewOpponent = (opponent) => {
		console.log(opponent)
		setOpponent(opponent)
		setOpenNewOpponentDialog(true)
	}

	const onStatus2Change = (setFieldValue, value) => {
		console.log(value)
		onAccordionFieldChange(1)
		setFieldValue('status_2', value)
	}

	const handleArchived = () => {
		if (props.contact.id) {
			if (props.contact.archived)
				updateContact({ id: props.contact.id, data: { unarchive: true } })
			else
				archive(props.contact.id)
		} else
			app.alert.setWarning("Erro, invalid contact id")
	}

	if (props.loading || preferences.loading)
		return (
			<Stack
				pr={1}
				spacing={1}
				sx={{ width: '350px', height: '100%', overflowY: "auto" }}
			>
				<LoadingPanel />
			</Stack>
		)

	return (
		<Stack
			pr={1}
			spacing={1}
			flex={'1 0 0'}
			minHeight={0}
			sx={{
				maxWidth: '350px',
				overflowY: "auto",
				minHeight: 0,
				overscrollBehavior: 'contain'
			}}
		>
			<CreatePersonDialog
				open={openNewFamilyMemberDialog}
				onClose={() => setOpenNewFamilyMemberDialog(false)}
				contact={props.contact}
				onSuccess={onSuccessRelationship}
				person={familyMember}
			/>

			<PeopleDialog
				open={openPeopleDialog}
				onViewPerson={onViewPerson}
				people={props.contact?.relationships}
				onClose={setOpenPeopleDialog}
			/>

			<CreateOpponentDialog
				open={openNewOpponentDialog}
				onClose={() => { setOpenNewOpponentDialog(false), setOpponent(null) }}
				opponent={opponent}
				onSuccess={onSuccessOpponent}
				contact={props.contact}
			/>

			<OpponentDialog
				open={openOpponentDialog}
				onClose={() => setOpenOpponentDialog(false)}
				onViewOpponent={onViewOpponent}
				opponents={props.contact?.opponents}
			/>

			<Formik
				initialValues={initialValues.general}
				onSubmit={onUpdateGeneral}
				validationSchema={formValidation}
				enableReinitialize={true}
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
								{ label: labels.first_name, name: 'first_name', value: formikProps.values.first_name, component: TextField },
								{ label: labels.last_name, name: 'last_name', value: formikProps.values.last_name, component: TextField },
								{ label: labels.nick_name, name: 'nick_name', value: formikProps.values.nick_name, component: TextField },
								{ label: labels.phone, name: 'phone', type: "tel", value: formikProps.values.phone, component: TextField, error: formikProps.errors.phone, touch: formikProps.touched.phone },
								{ label: 'Email', name: 'email', type: "email", value: formikProps.values.email, component: TextField, error: formikProps.errors.email, touch: formikProps.touched.email },
								{ label: labels.twitter_profile, name: 'twitter_handle', value: formikProps.values.twitter_handle, component: TextField },
							]}
						/>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.details}
				onSubmit={onUpdateDetails}
				validationSchema={detailsFormValidation}
				enableReinitialize={true}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }} onSubmit={(e) => { e.preventDefault(); formikProps.handleSubmit() }}>
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
									label: labels.grad_year,
									name: 'graduation_year',
									type: "number",
									value: formikProps.values.graduation_year,
									component: TextField
								},
								{
									label: labels.high_school,
									name: 'high_school',
									value: formikProps.values.high_school,
									component: TextField,
								},
								{
									label: 'ETS Code',
									name: 'ets_code',
									value: formikProps.values.ets_code,
									component: TextField,
								},
							]}
						>
							<DatePicker
								label={labels.dob}
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
								label={labels.state}
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
								label={labels.time_zone}
								placeholder="Search"
								value={formikProps.values.time_zone}
								options={timeZones}
								isOptionEqualToValue={(option, value) => option.name === value || option.name === value.name}
								getOptionLabel={(option) => option.name || option}
								getChipLabel={(option) => option.name || option}
								onChange={(newValue) => {
									formikProps.setFieldValue("time_zone", newValue)
									onAccordionFieldChange(1)
								}}
								clearOnBlur
							/>
							<SearchableSelector
								label={labels.status}
								placeholder="Search"
								// multiple
								value={formikProps.values.status}
								options={status.items || []}
								loading={status.loading}
								isOptionEqualToValue={(option, value) => option.id === value.id}
								getOptionLabel={(option) => option.status}
								onChange={(newValue) => {
									console.log(newValue)
									formikProps.setFieldValue('status', newValue)
									onAccordionFieldChange(1)
								}}
								clearOnBlur
							/>

							<SearchableSelector
								label={labels.status_2}
								placeholder="Search"
								value={formikProps.values.status_2}
								options={status2.items.map(status => status.value)}
								loading={status2.loading}
								isOptionEqualToValue={(option, value) => option === value}
								getOptionLabel={(option) => option}
								freeSolo
								onChange={(newValue) => {
									// console.log(newValue)
									// formikProps.setFieldValue('status_2', newValue)
									// onAccordionFieldChange(1)
									onStatus2Change(formikProps.setFieldValue, newValue)
								}}
								clearOnBlur={false}
							/>

							<SearchableSelector
								label={labels.rank}
								placeholder="Search"
								value={formikProps.values.rank}
								options={ranks.items}
								loading={ranks.loading}
								isOptionEqualToValue={(option, value) => option.id === value.id}
								getOptionLabel={(option) => option?.rank || option}
								getChipLabel={(option) => option?.rank || option}
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
				enableReinitialize={true}
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
								label={labels.position_coach}
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
								label={labels.area_coach}
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
								label={labels.coordinator}
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
				enableReinitialize={true}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='positions'
							id='positions'
							title={labels.positions}
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[3]}
							showButtonSummary
							showSaveButton={showSaveButton[3]}
							onDiscard={(e) => onDiscard(e, 3, formikProps)}
						>
							<SearchableSelector
								label={labels.positions}
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
				enableReinitialize={true}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='relationships'
							id='family-relationship'
							title={labels.relationships}
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[4]}
							showButtonSummary
							showSaveButton={showSaveButton[4]}
							onFieldChange={(e) => onFieldChange(e, 4, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 4, formikProps)}
						>
							<Button
								name={`Add new ${labels.relationships}`}
								type="button"
								variant='contained'
								onClick={() => { setOpenNewFamilyMemberDialog(true); setFamilyMember(null) }}
							/>

							<List sx={{ p: 0 }} >
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
									<ListItem>
										<Button
											sx={{
												marginInline: "auto",
												width: "max-content",
											}}
											type="button"
											name="View More..."
											variant='outlined'
											// endIcon={<MoreHorizIcon />}
											onClick={() => setOpenPeopleDialog(true)}
										/>
									</ListItem>
								}
							</List>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.opponents}
				onSubmit={onUpdateOpponents}
				enableReinitialize={true}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='opponents'
							id='opponents'
							title={labels.opponents}
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[5]}
							showButtonSummary
							showSaveButton={showSaveButton[5]}
							onFieldChange={(e) => onFieldChange(e, 5, formikProps)}
							onFieldValue={formikProps.setFieldValue}
							onDiscard={(e) => onDiscard(e, 5, formikProps)}
							clearOnBlur
						>
							<Button
								name={`Add new ${labels.opponents}`}
								type="button"
								variant='contained'
								onClick={() => setOpenNewOpponentDialog(true)}
							/>

							<List sx={{ p: 0 }}>
								{props.contact?.opponents?.slice(0, 3)
									.map(opponent => {
										return (
											<ListItemButton
												key={opponent.id}
												onClick={() => onViewOpponent(opponent)}
											>
												<Stack direction="row" flex={1}>
													<Stack flex={1}>{opponent.name}</Stack>
													<Stack>{opponent.score}</Stack>
												</Stack>
											</ListItemButton>
										)
									})
								}
								{props.contact?.opponents?.length > 3 &&
									<ListItem>
										<Button
											sx={{
												marginInline: "auto",
												width: "max-content",
											}}
											type="button"
											name="View More..."
											variant='outlined'
											onClick={() => setOpenOpponentDialog(true)}
										/>
									</ListItem>
								}
							</List>

						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues.external}
				onSubmit={onUpdateExternal}
				enableReinitialize={true}
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
				enableReinitialize={true}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
							key='tags'
							id='tags'
							title={labels.tags}
							expandedId={expandedAccordionId}
							setExpanded={setExpandedAccordion}
							saving={savingContact[7]}
							showButtonSummary
							showSaveButton={showSaveButton[7]}
							onDiscard={(e) => onDiscard(e, 7, formikProps)}
						>
							<SearchableSelector
								label={labels.tags}
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
			>
				<Button
					name={props.contact.archived ? "Unarchive" : "Archive"}
					type="button"
					variant='outlined'
					onClick={() => handleArchived()}
				/>
			</AccordionComponent>
		</Stack>
	)
}

export default ContactProfileDetails;