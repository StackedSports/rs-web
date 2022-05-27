import { getFullName, formatDateWithoutUTC } from "utils/Parser"
import { format } from "date-fns"
import { Link } from 'react-router-dom'
import { messageRoutes } from 'Routes/Routes';

const SendTime = {
    field: 'send_at',
    headerName: 'Send Time',
    valueGetter: (params) =>params.row?.send_at ? format(formatDateWithoutUTC(params.row.send_at), 'Pp') : '',
    flex: 1
}
const Sender = {
    field: 'sender',
    headerName: 'Sender',
    valueGetter: (params) => params.row?.sender ? getFullName(params.row.sender) : '',
    flex: 1
}
const Recipients = {
    field: 'recipient_count',
    headerName: 'Recipients/Results',
    flex: 1
}
const Type = {
    field: 'platform',
    headerName: 'Type',
    valueGetter: (params) => params.row?.platform ? params.row.platform?.name : '',
    flex: 1
}
const Status = {
    field: 'status',
    headerName: 'Status',
    flex: 1
}

const Details = {
    field: 'details',
    headerName: 'Details',
    flex: 1,
    valueGetter: (params) => 'View Details',
    renderCell: (params) => (
        <Link style={{ color: 'inherit' }} to={`${messageRoutes.details}/${params.id}`} >
            {params.value}
        </Link>
    )
}   

export const columns = [
    SendTime,
    Sender,
    Type,
    Status,
    Recipients,
    Details
]