import DataTable from 'UI/Tables/DataTable'

import { columns } from './StatusesTableConfig'

const StatusesTable = (props) => {

  return (
    <DataTable
      items={props.items}
      columns={columns}
      selectionModel={props.selection}
      onSelectionChange={props.onSelectionChange}
      loading={props.loading}
      onRowClick={(e)=>props.onRowClick(e.row)}
      checkboxSelection
      disableSelectionOnClick
    />
  )
}

export default StatusesTable