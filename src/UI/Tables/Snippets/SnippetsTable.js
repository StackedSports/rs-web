import DataTable from 'UI/Tables/DataTable'

import { columns } from './SnippetsTableConfig'

const SnippetsTable = (props) => {

  return (
    <DataTable
      items={props.items}
      columns={columns}
      selectionModel={props.selection}
      onSelectionModelChange={props.onSelectionChange}
      loading={props.loading}
      checkboxSelection
    />
  )
}

export default SnippetsTable