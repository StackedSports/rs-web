 // @ts-nocheck
import React, { useContext } from 'react'
import { UserSettingsPage } from './UserSettingsPage'
import { List, ListItem, ListItemText, ListSubheader, Switch } from '@mui/material'
import { useFormik } from 'formik';
import { db } from 'Api/Firebase'
import { collection, doc } from 'firebase/firestore';
import { AuthContext } from 'Context/Auth/AuthProvider'

export const UserSettingsPreferencesPage: React.FC = () => {
    const { user } = useContext(AuthContext)

    const initialValues = {
        showColumnOnFilter: true,
    };

    const contactPreferenceRef = doc(collection(db, 'orgs', user.team.org.id, 'kanbans'))


    const formik = useFormik({
        initialValues,
        onSubmit: (values, formikHelpers) => {
            //TODO Function to save goes here
            console.log(values)
            formikHelpers.setSubmitting(false)
        }
    });

    const mainActions = [
        {
            name: 'Save Settings',
            onClick: formik.submitForm,
            variant: 'contained',
        },
    ]
    return (
        <UserSettingsPage
            title='User Preferences'
            actions={mainActions}
        >
            <List
                component={'form'}
                sx={{ width: '100%' }}
            >
                <ListSubheader>
                    Table Settings
                </ListSubheader>

                <ListItem divider>
                    <ListItemText
                        primary="Show column on filter"
                        secondary="If the filtered column of the table is hidden it will show up" />
                    <Switch
                        edge="end"
                        name="showColumnOnFilter"
                        checked={formik.values.showColumnOnFilter}
                        onChange={formik.handleChange}
                    />
                </ListItem>
            </List>
        </UserSettingsPage >
    )
}