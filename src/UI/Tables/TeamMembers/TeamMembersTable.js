import DataTable from 'UI/Tables/DataTable'

import { columns } from './TeamMembersTableConfig'

const TeamMembersTable = (props) => {

    return (
        <DataTable
          items={props.items}
          columns={columns}
          selectionModel={props.selection}
          onSelectionChange={props.onSelectionChange}
          loading={props.loading}
          checkboxSelection
          disableSelectionOnClick
        />
    )
}

export default TeamMembersTable