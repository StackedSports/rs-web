import React, { useContext } from 'react'
import { UserSettingsPage } from './UserSettingsPage'
import { List, ListItem, ListItemText, ListSubheader, Switch } from '@mui/material'
import { useFormik } from 'formik';
import { useUserPreference } from 'Api/ReactQuery/UserPrefences';

export const UserSettingsPreferencesPage: React.FC = () => {
    const preferences = useUserPreference()
    console.log("user PRefenreces", preferences)

    const initialValues = {
        showColumnOnFilter: true,
    };

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