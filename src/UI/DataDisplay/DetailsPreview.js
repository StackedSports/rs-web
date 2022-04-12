
import { Stack, Typography } from '@mui/material'

const DetailsPreview = (props) => {
    return (
        <Stack
          direction={props.direction || 'row'}
          spacing={props.spacing || 1}
          alignItems="center"
        >
            <Typography variant="info">
                {props.label}
            </Typography>
            <Typography variant="info-bold" fontWeight="bold">
                {props.value}
            </Typography>
        </Stack>
    )
}

export default DetailsPreview