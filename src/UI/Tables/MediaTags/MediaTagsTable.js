import DataTable from 'UI/Tables/DataTable'

import { columns } from './MediaTagsTableConfig'

const MediaTagsTable = (props) => {

  return (
    <DataTable
      items={props.items}
      columns={columns}
      selectionModel={props.selection}
      onSelectionModelChange={props.onSelectionChange}
      loading={props.loading}
      checkboxSelection={props.checkboxSelection}
      hidePagination
    />
  )
}

export default MediaTagsTable