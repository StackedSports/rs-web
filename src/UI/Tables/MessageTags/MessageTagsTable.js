import DataTable from 'UI/Tables/DataTable'

import { columns } from './MessageTagsTableConfig'

const MessageTagsTable = (props) => {

  return (
    <DataTable
      items={props.items}
      columns={columns}
      selectionModel={props.selection}
      onSelectionModelChange={props.onSelectionChange}
      loading={props.loading}
      checkboxSelection
      hidePagination
    />
  )
}

export default MessageTagsTable