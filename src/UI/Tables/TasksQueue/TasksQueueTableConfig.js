import { getFullName } from "utils/Parser"
import format from "date-fns/format"

const SendTime = {
    field: 'send_at',
    headerName: 'Send Time',
    valueGetter: (params) => params.row?.send_at ? format(new Date(params.row.send_at),'Pp') : '',
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
    headerName: 'Recipients',
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

export const columns = [
    SendTime,
    Sender,
    Recipients,
    Type,
    Status
]