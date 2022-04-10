import SettingsPage from './SettingsPage'
import FormOrganizationSettings from './FormOrganizationSettings'
import BoxFaviconOrganization from './BoxFaviconOrganization'
import Box from '@mui/material/Box'

const OrganizationSettingsPage = (props) => {
    return (
        <SettingsPage
            title='Organization'
        >
            <Box sx={{
                display: 'flex',
            }}>
                <FormOrganizationSettings />
                <BoxFaviconOrganization />
            </Box>
        </SettingsPage>
    )
}

export default OrganizationSettingsPage