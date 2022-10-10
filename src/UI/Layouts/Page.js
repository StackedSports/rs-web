import { Box } from '@mui/material'
import './Page.css'

export function Content(props) {
    return (
        <div className='Content'>
            {props.children}
        </div>
    )
}
export default function Page(props) {
    return (
        <Box
            className='Page'
            sx={{
                backgroundColor: 'background.secondary'
            }}
        >
            {props.children}
        </Box>
    )
}