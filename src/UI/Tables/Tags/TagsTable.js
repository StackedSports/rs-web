import DataTable from 'UI/Tables/DataTable'

import { columns } from './TagsGridConfig'

const TagsTable = (props) => {

    return (
        <DataTable
          items={props.tags}
          columns={columns}
          mini={props.mini ? true : false}
          selection={props.selection}
          onSelectionChange={props.onSelectionChange}
          loading={props.loading}
          checkboxSelection
        />
    )
}

export default TagsTable