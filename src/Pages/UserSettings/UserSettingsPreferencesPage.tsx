import React, { useContext } from 'react'
import { UserSettingsPage } from './UserSettingsPage'
import { List, ListItem, ListItemText, ListSubheader, Switch } from '@mui/material'
import { useFormik } from 'formik';
import { useUserPreference, useUserPreferenceMutation } from 'Api/ReactQuery/UserPrefences';
import { AppContext } from 'Context/AppProvider';

export const UserSettingsPreferencesPage: React.FC = () => {
    const { alert } = useContext(AppContext)
    const updatePreference = useUserPreferenceMutation()
    const { preferences } = useUserPreference()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: preferences,
        onSubmit: (values, formikHelpers) => {
            updatePreference.mutate(values, {
                onSuccess: () => alert.setSuccess("Preferences updated"),
                onSettled: () => formikHelpers.setSubmitting(false)
            })
        },

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
                    Theme Settings
                </ListSubheader>

                <ListItem divider>
                    <ListItemText
                        primary="Dark mode"
                    />
                    <Switch
                        edge="end"
                        name="darkMode"
                        checked={formik.values.darkMode}
                        onChange={formik.handleChange}
                    />
                </ListItem>

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