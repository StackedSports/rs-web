import DataTable from 'UI/Tables/DataTable'

import { columns } from './ContactsTagsTableConfig'

const ContactsTagsTable = (props) => {

  return (
    <DataTable
      items={props.items}
      columns={columns}
      selectionModel={props.selection}
      onSelectionModelChange={props.onSelectionChange}
      loading={props.loading}
      checkboxSelection={props.checkboxSelection}
      disableSelectionOnClick
      hidePagination
    />
  )
}

export default ContactsTagsTable