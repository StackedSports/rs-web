import { Skeleton, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react'

interface DetailsProps {
    label: string;
    value: string | ReactNode | null;
    column?: boolean;
    loading?: boolean;
    color?: string
}

export const Details = ({ label, value, column, loading, color }: DetailsProps) => {

    return (
        <Stack direction={column ? 'column' : 'row'} mb={.5} columnGap={1.5}>
            <Typography variant='body1'>{label}:</Typography>
            <Typography
                flex={1}
                variant='body1'
                fontWeight='bold'
                color={color || 'text.primary'}
                textTransform={'capitalize'}
            >
                {loading ? <Skeleton sx={{ width: '100%', maxWidth: '300px' }} /> : value ? value : "-"}
            </Typography>
        </Stack>
    )
}
