import { Box, styled } from '@mui/material'

export const PanelWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: '5px',
    paddingBlockStart: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,

    '&> : last - child': {
        marginBottom: '8px'
    },

    '& .Header': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: theme.spacing(2),

        '.Icon': {
            marginRight: '20px',
        },

        '.IconBack': {
            marginRight: '30px',
        },

        '.JustifyRight': {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: theme.spacing(1.3)
        },

        '.Title': {
            fontSize: '18px',
            fontWeight: 'bold',
            margin: 0,
        },
    },

    '& .Content': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingInline: '20px',
        minHeight:0
    },

    '&.PainelBlank .Content': {
        paddingInline: 0,
        marginTop: 0
    },
}));