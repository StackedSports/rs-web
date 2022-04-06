import SettingsPage from './SettingsPage'

const MembersSettingsPage = () => {

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
          title='Members'
          topActionName='+ New Member'
          onTopActionClick={onTopActionClick}
        >

        </SettingsPage>
    )
}

export default MembersSettingsPage