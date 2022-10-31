import { Stack, styled } from "@mui/material";

export const SideFilterWrapper = styled(Stack)(({ theme }) => ({
    width: 220,
    marginRight: 10,
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
        width: 0,
        height: 0,
    },

    '&:hover::-webkit-scrollbar': {
        width: 5,
        height: 5,
    },

    '.Category-Header': {
        justifyContent: 'flex-start',
        fontSize: '1rem',
        letterSpacing: 0,

        '	.MuiButton-startIcon': {
            marginRight: 0,
        },

        '.Icon': {
            transform: 'rotate(90deg)',
            transition: theme.transitions.create(['transform']),

            '&.collapsed': {
                transform: 'rotate(-90deg)',
            },
        },
    },

    '.link': {
        fontSize: 13,
        paddingLeft: 23,

        '&.Mui-selected': {
            fontWeight: 'bold'
        },
    }
}))