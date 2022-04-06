import DataTable from 'UI/Tables/DataTable'

import { columns } from './TeamMembersTableConfig'

const TeamMembersTable = (props) => {

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

export default TeamMembersTable