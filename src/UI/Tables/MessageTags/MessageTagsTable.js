import DataTable from 'UI/Tables/DataTable'

import { columns } from './MessageTagsTableConfig'

const MessageTagsTable = (props) => {

  return (
    <DataTable
      items={props.tags}
      columns={columns}
      selection={props.selection}
      onSelectionChange={props.onSelectionChange}
      loading={props.loading}
      onRowClick={props.onRowClick && ((e) => props.onRowClick(e.row))}
      checkboxSelection={props.checkboxSelection}
      disableSelectionOnClick
      hidePagination
    />
  )
}

export default MessageTagsTable