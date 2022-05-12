import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog';
import PeopleTable from 'UI/Tables/People/PeopleTable';

const PeopleDialog = (props) => {

  // const visibleTableRows = {
  //   // fullname: true,(default)
  //   profileImg: false,
  //   twitterName: true,
  // }

  const onClose = () => {
    props.onClose(false)
  }

  return (
    <BaseDialog
      title="FAMILY & RELATIONSHIP"
      hideActions
      maxWidth="lg"
      open={props.open}
      onClose={onClose}
    >
      <PeopleTable
        mini
        people={props.people}
        onViewPerson={props.onViewPerson}
      />
    </BaseDialog>
  )
}
export default PeopleDialog;