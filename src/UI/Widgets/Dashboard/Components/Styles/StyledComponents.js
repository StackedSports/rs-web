import { styled, Typography, Card } from "@mui/material";

export const SectionCard = styled(Card)(({ theme }) => ({
    '.MuiCardHeader-root': {
        flexWrap: 'wrap',
        gap: 3,

        '& .MuiCardHeader-content': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(1),
        },

        '& .MuiCardHeader-action': {
            alignSelf: 'center',
            margin: 0,
        },

    },

    '.MuiCardContent-root': {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },

    '.MuiOutlinedInput-notchedOutline': {
        '& legend': {
            width: 'unset',
        },
    },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(26),
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: theme.typography.pxToRem(31),
}));
export const SectionSubTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: theme.typography.pxToRem(19),
}));
export const Title = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: theme.typography.pxToRem(23),
}));