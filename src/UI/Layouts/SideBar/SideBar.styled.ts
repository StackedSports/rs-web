import { Box, styled } from "@mui/material";

export const SiderBarWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '70px',
    left: 0,
    width: '60px',
    bottom: 0,
    transform: 'translateX(-60px)',
    transition: 'all 300ms cubic- bezier(1, 0, 0, 1)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,

    '@media screen and (min-width: 1000px)': {
        transform: 'translateX(0)',
    },

    '.navLink': {
        height: '60px',
        minWidth: '60px',
        transition: 'border 0s',
        borderRadius: 0,

        '&:hover': {
            borderLeft: '4px solid',
            borderColor: theme.palette.mode === 'light' ? '#a4a4a4' : '#fff'
        },

        '&.selected': {
            background: theme.palette.mode === 'light' ? 
            'linear-gradient(90deg, #dddddd 10%, #e1e8ef00 100%)' :
            'linear-gradient(90deg, #6d6d6d 10%, #e1e8ef00 100%)'
        }
    }
}))