import { Grid } from "@mui/material"
import { DataGridPro } from '@mui/x-data-grid-pro';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { columnsMini, columnsFull } from './PeopleTableConfig';

export default function PeopleTable(props) {
    const columns = props.mini ? columnsMini : columnsFull
    // const visibleColumns = useContactTableColumns(props.columnsControl, props.id)

    // const onColumnVisibilityModelChange = (newModel) => {
    //     // setVisibleColumns(newModel)
    //     visibleColumns.onChange(newModel)
    // }

    const onCellClick = ({ field, row }) => {
        if (field === 'fullName') {
            props.onViewPerson(row)
        }
    }

    return (
        <Stack spacing={2} style={{ height: props.mini ? 500 : 850 }}>
            <DataGridPro sx={{ m: 0 }}
              rows={props.people || []}
              columns={columns}
              hideFooter
              onCellClick={onCellClick}
            />
        </Stack>
    )
}