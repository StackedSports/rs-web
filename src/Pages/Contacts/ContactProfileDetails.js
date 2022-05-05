import { useState, useEffect, useMemo, useContext } from 'react';
import { Formik, Form } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";

import AccordionComponent from 'UI/Widgets/Accordion';
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector';
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import CreatePersonDialog from 'UI/Widgets/Contact/CreatePersonDialog';
import CreateOpponentDialog from 'UI/Widgets/Contact/CreateOpponentDialog';

import { states } from 'utils/Data';
import {
	useTeamMembers,
	usePositions,
	useStatuses,
	useRanks,
	useTags2,
} from 'Api/Hooks'

import {
	updateContact,
} from 'Api/Endpoints'

import { AppContext } from 'Context/AppProvider'

import { formatPhoneNumber, getFullName } from 'utils/Parser';
import { objectNotNull } from 'utils/Validation'
import { getStringListOfIds } from 'utils/Helper'
import Button from 'UI/Widgets/Buttons/Button';

const regexPhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const formValidation = Yup.object().shape({
	phone: Yup.string().matches(regexPhoneNumber, {
		message: "Invalid phone number"
	}),
	// email: Yup.string().email("Invalid email"),
})

const ContactProfileDetails = (props) => {
	if (props.loading)
		return (
			<Stack
				pr={1}
				spacing={1}
				sx={{ width: '350px', height: '100%' }}
				overflowY="auto"
				style={{ borderRight: "#efefef  1px solid" }}
			>
				<LoadingPanel />
			</Stack>
		)

	const app = useContext(AppContext)

	const [expandedAccordionId, setExpandedAccordion] = useState()
	const [savingContact, setSavingContact] = useState([false, false, false, false, false, false, false, false])
	const [showSaveButton, setShowSaveButton] = useState([false, false, false, false, false, false, false, false])
	const [openNewFamilyMemberDialog, setOpenNewFamilyMemberDialog] = useState(false)
	const [openNewOpponentDialog, setOpenNewOpponentDialog] = useState(false)

	const teamMembers = useTeamMembers()
	const positions = usePositions()
	const status = useStatuses()
	const ranks = useRanks()
	const tags = useTags2()

	console.log(props.contact)

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
			graduation_year: props.contact?.grad_year || "",
			high_school: props.contact?.high_school || "",
			state: props.contact?.state || "",
			status: props.contact?.status?.status || '',
			rank: props.contact?.rank?.rank || "",
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
				case 'position_tags':
					newData[key] = data[key].map(position => {
						if (typeof position === 'string')
							return position
						else
							return position.abbreviation
					})
					break
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
		onUpdateContact(values, 'details', 1)
	}

	const onUpdateCoaches = (values, actions) => {
		onUpdateContact(values, 'coaches', 2)
	}

	const onUpdatePositions = (values, actions) => {
		onUpdateContact(values, 'positions', 3)
	}

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
		onUpdateContact(values, 'tags', 7)
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

	const onRelationshipCreated = (relationship) => {
		console.log("new relationship Created ",relationship)
		
	}

	return (
		<Stack
			pr={1}
			spacing={1}
			sx={{ width: '350px', height: '100%' }}
			overflowY="auto"
			style={{ borderRight: "#efefef  1px solid" }}
		>
			<CreatePersonDialog
				open={openNewFamilyMemberDialog}
				onClose={() => setOpenNewFamilyMemberDialog(false)}
				contact={props.contact}
				onCreated={onRelationshipCreated}
			/>

			<CreateOpponentDialog
				open={openNewOpponentDialog}
				onClose={() => setOpenNewOpponentDialog(false)}
				contact={props.contact}
			//onCreated ={onOpponentCreated  }
			/>

			<Formik
				initialValues={initialValues.general}
				onSubmit={onUpdateGeneral}
				validationSchema={formValidation}
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
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
			>
				{(formikProps) => (
					<Form style={{ width: '100%' }}>
						<AccordionComponent
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
								{ label: 'Graduation Year', name: 'graduation_year', type: "number", value: formikProps.values.graduation_year, component: TextField },
								{ label: 'Current School', name: 'high_school', value: formikProps.values.high_school, component: TextField },
							]}
						>
							<SearchableSelector
								label="State"
								placeholder="Search"
								value={formikProps.values.state}
								options={states || []}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => option.abbreviation || option || ""}
								getChipLabel={(option) => option.abbreviation}
								onChange={(newValue) => {
									console.log(newValue)
									formikProps.setFieldValue("state", newValue?.abbreviation)
									onAccordionFieldChange(1)
								}}
							/>

							<SearchableSelector
								label="Status"
								placeholder="Search"
								// multiple
								value={formikProps.values.status}
								options={status.items || []}
								loading={status.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => option.status || option || ""}
								onChange={(newValue) => {
									console.log(newValue)
									formikProps.setFieldValue('status', newValue)
									onAccordionFieldChange(1)
								}}
							/>

							<SearchableSelector
								label="Rank"
								placeholder="Search"
								// multiple
								value={formikProps.values.rank}
								options={ranks.items || []}
								loading={ranks.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => option.rank || option}
								getChipLabel={(option) => option.rank}
								onChange={(newValue) => {
									formikProps.setFieldValue('rank', newValue)
									onAccordionFieldChange(1)
								}}
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
								options={positions.items || []}
								loading={positions.loading}
								isOptionEqualToValue={(option, value) => option?.id === value?.id}
								getOptionLabel={(option) => option.abbreviation || option}
								getChipLabel={(option) => option.abbreviation || option}
								onChange={(newValue) => {
									formikProps.setFieldValue("position_tags", newValue)
									onAccordionFieldChange(3)
								}}
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
								{ label: 'People', name: 'relationships', value: formikProps.values.relationships, component: TextField },
							]}
						>
							<Button
								name="Add new relationship"
								type="button"
								variant='contained'
								onClick={() => setOpenNewFamilyMemberDialog(true)}
							/>
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
							/>
						</AccordionComponent>
					</Form>
				)}
			</Formik>

			<AccordionComponent
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