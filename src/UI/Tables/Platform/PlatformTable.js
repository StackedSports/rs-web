import DataTable from 'UI/Tables/DataTable'

import { columns } from './PlatformTableConfig'

const PlatformTable = (props) => {

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

export default PlatformTable