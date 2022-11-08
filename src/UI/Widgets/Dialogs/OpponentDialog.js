import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog';
import OpponentsTable from 'UI/Tables/Opponents/OpponentsTable';

const OpponentDialog = (props) => {

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
      title="Opponents"
      hideActions
      maxWidth="lg"
      open={props.open}
      onClose={onClose}
    >
      <OpponentsTable
        mini
        opponents={props.opponents}
        onViewOpponent={props.onViewOpponent}
      />
    </BaseDialog>
  )
}
export default OpponentDialog;