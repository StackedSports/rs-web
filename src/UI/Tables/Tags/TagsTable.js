import DataTable from 'UI/Tables/DataTable'

import { columns } from './TagsGridConfig'

const TagsTable = (props) => {

    return (
        <DataTable
          apiRef={props.apiRef}
          onStateChange={props.onStateChange}
          items={props.tags}
          columns={columns}
          mini={props.mini ? true : false}
          selection={props.selection}
          onSelectionChange={props.onSelectionChange}
          loading={props.loading}
          onFilterModelChange={props.onFilterModelChange}
          filterModel={props.filterModel}
          components = {props.components}
          checkboxSelection
          hidePagination
        />
    )
}

export default TagsTable