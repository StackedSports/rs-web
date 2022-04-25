import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";

import AccordionComponent from 'UI/Widgets/Accordion';
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector';

import { states } from 'utils/Data';
import {
  useTeamMembers,
  usePositions,
  useStatuses,
  useRanks,
  useTags2,
} from 'Api/Hooks'



const ContactProfileDetails = (props) => {

  const [expandedAccordionId, setExpandedAccordion] = useState()
  const [loadingUpdateContact, setLoadingUpdateContact] = useState(false)

  const teamMembers = useTeamMembers()
  const positions = usePositions()
  const status = useStatuses()
  const ranks = useRanks()
  const tags = useTags2()

  useEffect(() => {
    if (!ranks.items)
      return
    if (!status.items)
      return
  }, [ranks.items, status.items])

  useEffect(() => {
    if (!positions.items)
      return
  }, [positions.items])

  useEffect(() => {
    if (!teamMembers.items)
      return
  }, [teamMembers.items])

  const onUpdateContact = (contact) => {
    // setLoadingUpdateContact(true)
    console.log(loadingUpdateContact)
    props.onUpdateContact(contact)
  }

  const regexPhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  const formValidation = Yup.object().shape({
    phone: Yup.string().matches(regexPhoneNumber, {
      message: "Invalid phone number"
    }),
    // email: Yup.string().email("Invalid email"),
  })

  return (
    <Stack
      //   flex={1} 
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      pr={1}
      spacing={1}
      sx={{ width: '350px', height: '100%' }}
      style={{ borderRight: "#efefef  1px solid" }} >
      {!props.loadingContact &&
        <Formik
          initialValues={props.initialValuesForm}
          onSubmit={(values, actions) => {
            onUpdateContact(values)
          }}
          validationSchema={formValidation}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form style={{ flex: 1, width: '100%' }}>
              <Stack
                flex={1}
                justifyContent="center"
                alignItems="start"
                spacing={2}
              >
                <AccordionComponent
                  id='general'
                  title='GENERAL'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                  onFildChange={handleChange}
                  setFildValue={setFieldValue}
                  items={[
                    { label: 'First Name', name: 'first_name', value: values.first_name, component: TextField },
                    { label: 'Last Name', name: 'last_name', value: values.last_name, component: TextField },
                    { label: 'Nick Name', name: 'nick_name', value: values.nick_name, component: TextField },
                    { label: 'Phone Number', name: 'phone', type: "tel", value: values.phone, component: TextField, error: errors.phone, touch: touched.phone },
                    { label: 'Email', name: 'email', type: "email", value: values.email, component: TextField, error: errors.email, touch: touched.email },
                    { label: 'Twitter Handle', name: 'twitter_handle', value: values.twitter_handle, component: TextField },
                  ]}
                />

                <AccordionComponent
                  id='details'
                  title='DETAILS'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                  onFildChange={handleChange}
                  setFildValue={setFieldValue}
                  items={[
                    { label: 'Graduation Year', name: 'graduation_year', type: "number", value: values.graduation_year, component: TextField },
                    { label: 'Current School', name: 'high_school', value: values.high_school, component: TextField },
                  ]}
                >
                  <SearchableSelector
                    label="State"
                    placeholder="Search"
                    // multiple
                    value={values.state}
                    options={states || []}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.abbreviation || values.state || ""}
                    getChipLabel={(option) => option.abbreviation}
                    onChange={(newValue) => {
                      const state = newValue.abbreviation
                      setFieldValue("state", state)
                    }}
                  />

                  <SearchableSelector
                    label="Status"
                    placeholder="Search"
                    // multiple
                    value={values.status_id}
                    options={status.items || []}
                    loading={status.loading}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.status || values.status_id || ""}
                    onChange={(newValue) => {
                      console.log(newValue)
                      setFieldValue("status_id", newValue.id)
                    }}
                  />

                  <SearchableSelector
                    label="Rank"
                    placeholder="Search"
                    // multiple
                    value={values.rank_id}
                    options={ranks.items || []}
                    loading={ranks.loading}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.rank || values.rank_id || ""}
                    getChipLabel={(option) => option.rank}
                    onChange={(newValue) => {
                      console.log(newValue)
                      setFieldValue("rank_id", newValue.id)
                    }}
                  />
                </AccordionComponent>

                <AccordionComponent
                  id='coaches'
                  title='COACHES'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                >
                  <>
                    <SearchableSelector
                      label="Position Coach"
                      placeholder="Search"
                      // multiple
                      value={values.position_coach_id}
                      options={teamMembers.items || []}
                      loading={teamMembers.loading}
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                      getOptionLabel={(option) => option.first_name || values.position_coach_id || ""}
                      getChipLabel={(option) => {
                        console.log('ccc', option)
                        return option.first_name || option
                      }}
                      onChange={(newValue) => {
                        const id = newValue.id
                        setFieldValue("position_coach_id", newValue)
                      }}
                    />
                    <SearchableSelector
                      label="Area Coach"
                      placeholder="Search"
                      // multiple
                      value={values.recruiting_coach_id}
                      options={teamMembers.items || []}
                      loading={teamMembers.loading}
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                      getOptionLabel={(option) => option.first_name || values.recruiting_coach_id || ""}
                      getChipLabel={(option) => {
                        console.log('ccc', option)
                        return option.first_name || option
                      }}
                      onChange={(newValue) => {
                        const id = newValue.id
                        setFieldValue("recruiting_coach_id", newValue)
                      }}
                    />
                    <SearchableSelector
                      label="Coordinator"
                      placeholder="Search"
                      // multiple
                      value={values.coordinator_id}
                      options={teamMembers.items || []}
                      loading={teamMembers.loading}
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                      getOptionLabel={(option) => option.first_name || values.coordinator_id || ""}
                      getChipLabel={(option) => {
                        console.log('ccc', option)
                        return option.first_name || option
                      }}
                      onChange={(newValue) => {
                        const id = newValue.id
                        setFieldValue("coordinator_id", newValue)
                      }}
                    />
                  </>
                </AccordionComponent>

                <AccordionComponent
                  id='positions'
                  title='POSITIONS'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                >
                  <SearchableSelector
                    label="Positions"
                    placeholder="Search"
                    multiple
                    value={values.position_tags}
                    options={positions.items || []}
                    loading={positions.loading}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.abbreviation || option || ""}
                    getChipLabel={(option) => {
                      return option.abbreviation || option
                    }}
                    onChange={(newValue) => {
                      const positions = newValue.map(position => position.abbreviation || position)
                      setFieldValue("position_tags", positions)
                    }}
                  />
                </AccordionComponent>

                <AccordionComponent
                  id='family-relationship'
                  title='FAMILY & RELATIONSHIP'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                  onFildChange={handleChange}
                  setFildValue={setFieldValue}
                  items={[
                    { label: 'People', name: 'relationships', value: values.relationships, component: TextField },
                  ]}
                />

                <AccordionComponent
                  id='opponents'
                  title='OPPNENTS'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                  onFildChange={handleChange}
                  setFildValue={setFieldValue}
                  items={[
                    { label: 'Opponents', name: 'opponents', value: values.opponents, component: TextField },
                  ]}
                />
                <AccordionComponent
                  id='external-profiles'
                  title='EXTERNAL PROFILES'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                  onFildChange={handleChange}
                  setFildValue={setFieldValue}
                  items={[
                    { label: 'Hudl', name: 'hudl_link', value: values.hudl_link, component: TextField },
                    { label: 'Arms Id', name: 'arms_id', value: values.arms_id, component: TextField },
                  ]}
                />
                <AccordionComponent
                  id='tags'
                  title='TAGS'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                >
                  <SearchableSelector
                    label="Tags"
                    placeholder="Search"
                    multiple
                    value={values.team_tags}
                    options={tags.items || []}
                    loading={tags.loading}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.name || option || ""}
                    getChipLabel={(option) => {
                      return option.name || option
                    }}
                    onChange={(newValue) => {
                      const teamTags = newValue.map(tag => tag.name || tag)
                      setFieldValue("team_tags", teamTags)
                    }}
                  />
                </AccordionComponent>

                <AccordionComponent
                  id='actions'
                  title='ACTIONS'
                  expandedId={expandedAccordionId}
                  setExpanded={setExpandedAccordion}
                  loadingUpdateContact={loadingUpdateContact}
                  showButtonSummary
                  onFildChange={handleChange}
                  setFildValue={setFieldValue}
                  items={[
                    { label: 'Archive', name: 'archived', value: values.archived, component: TextField },
                  ]}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      }
    </Stack>
  )
}

export default ContactProfileDetails;