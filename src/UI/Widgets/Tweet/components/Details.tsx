import React, { ReactNode } from 'react'
import { Box, Skeleton, Typography } from '@mui/material';
import Linkify from 'react-linkify';

interface DetailsProps {
    label: string;
    value: string | ReactNode | null;
    column?: boolean;
    loading?: boolean;
    color?: string
}

export const Details = ({ label, value, column, loading, color }: DetailsProps) => {

    return (
        <Box>
            <Typography
                variant='body1'
                component='span'
                mr={1}
                color='text.secondary'
            >
                {label}:
            </Typography>
            <Typography
                flex={1}
                component={column ? 'p' : 'span'}
                variant='body1'
                fontWeight='bold'
                color={color || 'text.primary'}
                textTransform={'capitalize'}
                sx={{
                    maxWidth: '600px',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    '>a': { textDecoration: 'underline', color: 'primary.main' }
                }}
            >
                {loading ? <Skeleton sx={{ width: '100%', maxWidth: '300px' }} /> :
                    <Linkify
                        componentDecorator={(decoratedHref, decoratedText, key) => (
                            <a target="blank" href={decoratedHref} key={key}>
                                {decoratedText}
                            </a>
                        )}
                    >
                        {value}
                    </Linkify>
                }
            </Typography>
        </Box>
    )
}
