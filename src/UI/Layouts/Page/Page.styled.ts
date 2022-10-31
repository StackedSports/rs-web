import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: 0,
    height: '100vh',
    transition: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.secondary
}));