import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import TeamMembersTable from 'UI/Tables/TeamMembers/TeamMembersTable'

import { useTeamMembers } from 'Api/Hooks'

const TeamMembersSettingsPage = () => {
    const teamMembers = useTeamMembers()

    useEffect(() => {
        if(!teamMembers.items)
            return
        
        console.log(teamMembers.items)
    }, [teamMembers.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
          title='Members'
          topActionName='+ New Member'
          onTopActionClick={onTopActionClick}
        >
            <TeamMembersTable
              items={teamMembers.items}
              loading={teamMembers.loading}
            />
        </SettingsPage>
    )
}

export default TeamMembersSettingsPage