import { DataGridPro } from '@mui/x-data-grid-pro';
import Stack from '@mui/material/Stack';
import { columnsMini, columnsFull } from './OpponentsTableConfig';

export default function OpponentsTable(props) {
    const columns = props.mini ? columnsMini : columnsFull

    const onCellClick = ({ field, row }) => {
        props.onViewOpponent(row)
    }

    return (
        <Stack spacing={2} style={{ height: props.mini ? 500 : 850 }}>
            <DataGridPro sx={{ m: 0 }}
                rows={props.opponents || []}
                columns={columns}
                hideFooter
                onCellClick={onCellClick}
            />
        </Stack>
    )
}