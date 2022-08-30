import DataTable from 'UI/Tables/DataTable'

import { columns } from './TagsGridConfig'

const TagsTable = (props) => {

  return (
    <DataTable
      apiRef={props.apiRef}
      onStateChange={props.onStateChange}
      mini={props.mini ? true : false}
      items={props.tags}
      columns={columns}
      selection={props.selection}
      onFilterModelChange={props.onFilterModelChange}
      filterModel={props.filterModel}
      onSelectionChange={props.onSelectionChange}
      loading={props.loading}
      onRowClick={props.onRowClick && ((e) => props.onRowClick(e.row))}
      components={props.components}
      checkboxSelection={props.checkboxSelection}
      disableSelectionOnClick
      hidePagination
    />
  )
}

export default TagsTable