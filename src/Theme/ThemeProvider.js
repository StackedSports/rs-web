/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 */

import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    CssBaseline,
} from '@mui/material'

import { lightTypography, darkTypography } from './Components/Typography'
import { darkPallete, lightPallete } from './Components/Palette'
import { components } from './Components/Components'
import { useUserPreference } from 'Api/ReactQuery/UserPrefences'
import { useEffect, useMemo } from 'react'

let theme2 = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3871da',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ffb74d',
            contrastText: '#000',
        },
        info: {
            main: '#0277bd',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#2e7d32',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#f9a825',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#c62828',
            contrastText: '#FFFFFF',
        },
        neutral: {
            main: '#1f1919',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
        },
    },
    typography: lightTypography,
})

const getDesignTokens = (isDarkMode) => ({
    palette: isDarkMode ? darkPallete : lightPallete,
    components: components,
    typography: isDarkMode ? darkTypography : lightTypography
})

const ThemeProvider = ({ children }) => {

    const { preferences } = useUserPreference()
    const theme = useMemo(() => createTheme(getDesignTokens(preferences.darkMode)), [preferences]);

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <CssBaseline  /* Material UI Styles */ />
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeProvider