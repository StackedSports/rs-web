import SettingsPage from './SettingsPage'

const TagSettingsPage = () => {

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
          title='Tags'
          topActionName='+ New Tag'
          onTopActionClick={onTopActionClick}
        >

        </SettingsPage>
    )
}

export default TagSettingsPage