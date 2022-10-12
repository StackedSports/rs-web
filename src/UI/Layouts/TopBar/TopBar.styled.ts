import { Stack, styled } from "@mui/material";

export const TopBarWrapper = styled(Stack)(({ theme }) => ({
    position: 'sticky',
    flexDirection: 'row',
    alignItems: 'center',
    height: '70px',
    width: '100%',
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: '2px',
    borderBottomColor: '#e9eaef',
    borderBottomStyle: 'solid',

    '.TeamLogo': {
        width: '60px',
        height: '70px',
        borderRightWidth: '2px',
        borderRightColor: 'rgb(233, 234, 239)',
        borderRightStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        'img': {
            width: '50px',
            height: '50px',
            objectFit: 'contain',
        }
    },

    '.Button': {
        width: '220px',
        height: '40px',
        marginInline: '20px',
    },

    '.Logo': {
        height: '38px',
        margin: '0 44px 0 44px',
    },

}))