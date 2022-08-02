import { getFullName, formatDateWithoutUTC, formatDate } from "utils/Parser"
import { format } from "date-fns"
import { Link } from 'react-router-dom'
import { messageRoutes } from 'Routes/Routes';

const formatRecipientsStatuses = (recipient_count) => {
    let result = '';
    if (recipient_count instanceof Object) {
        result = `Sent ${recipient_count.status?.sent || 0} of ${recipient_count.status?.total}`;
        if (recipient_count.status.skipped) result += `, ${recipient_count.status.skipped} skipped`;
        if (recipient_count.status.error) result += `, ${recipient_count.status.error} failed`;
    } else
        result = `Sent ${recipient_count}`;
    return result;
}

const SendTime = {
    field: 'send_at',
    headerName: 'Send Time',
    valueGetter: (params) => params.row?.first_sent_at ? formatDate(params.row.first_sent_at, 'medium', 'short') : formatDate(params.row.send_at, 'medium', 'short'),
    // valueGetter: (params) => params.row?.send_at ? format(formatDateWithoutUTC(params.row.send_at), 'Pp') : '',
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
    valueGetter: (params) => params.row?.recipient_count ? formatRecipientsStatuses(params.row.recipient_count) : '',
    flex: 1.5
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
    valueFormatter: (params) => params.value === 'Pending' ? 'Scheduled' : params.value,
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