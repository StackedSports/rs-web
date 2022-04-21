import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    CssBaseline
} from '@mui/material';

const typography = {
    h1: {
        fontSize: '18px',
        color: '#212529',
        fontWeight: 'bold'
    },
    info: {
        color: '#999',
    },
    'info-bold': {
        color: '#212529',
        fontWeight: 'bold'
    }
}

export default typography