import { Stack, styled } from "@mui/material";

export const SideFilterWrapper = styled(Stack)(({ theme }) => ({
    width: 220,
    marginRight: 20,
    paddingTop: 20,
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

        '.Icon': {
            transform: 'rotate(90deg)',
            transition: theme.transitions.create(['transform']),

            '&.collapsed': {
                transform: 'rotate(-90deg)',
            },
        },
    },

    '.link': {
        fontSize: 12,

        '&.Mui-selected': {
            fontWeight: 'bold'
        },
    }
}))