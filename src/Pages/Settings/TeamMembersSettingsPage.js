import { useContext, useEffect, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsPage from './SettingsPage';
import { useMainLayoutAlert } from 'UI/Layouts/MainLayout';

import TeamMembersTable from 'UI/Tables/TeamMembers/TeamMembersTable';

import { useTeamMembers } from 'Api/ReactQuery';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { deleteTeamMember } from 'Api/Endpoints';


const TeamMembersSettingsPage = () => {
    const alert = useMainLayoutAlert()
    const teamMembers = useTeamMembers()
    const confirmDialog = useContext(ConfirmDialogContext)

    const [selectedTeamMembers, setSelectedTeamMembers] = useState([])

    useEffect(() => {
        if (!teamMembers.items)
            return

        console.log(teamMembers.items)
    }, [teamMembers.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onSelectionChange = (e) => {
        setSelectedTeamMembers(e)
    }

    const onDeleteTeamMember = (e) => {
        const title = `Delete ${selectedTeamMembers.length} Team Member${selectedTeamMembers.length > 1 ? "s" : ""}?`
        confirmDialog.show(title, "This action is permanent. Are you sure you want to continue? ", () => {
            Promise.all(selectedTeamMembers.map(member => deleteTeamMember(member)))
                .then(() => {
                    teamMembers.refetch()
                    alert.setSuccess("Team member deleted successfully.");
                })
                .catch(error => {
                    console.log(error)
                    alert.setError("Failed to deleted team member.");
                })
        })
    }

    const actions = useMemo(() => {
        if (selectedTeamMembers.length > 0)
            return [
                {
                    name: 'Delete (' + selectedTeamMembers.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteTeamMember,
                }
            ]
        return []
    }, [selectedTeamMembers])

    return (
        <SettingsPage
            title='Team Members'
            actions={actions}
            topActionName='+ New Team Member'
            onTopActionClick={onTopActionClick}
            alert={alert}
        >
            <TeamMembersTable
                items={teamMembers.items}
                loading={teamMembers.loading}
                onSelectionChange={onSelectionChange}
            />
        </SettingsPage>
    )
}

export default TeamMembersSettingsPage