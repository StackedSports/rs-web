/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 */

import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    CssBaseline
} from '@mui/material'

import typography from './Components/DataDisplay/Typography'

let theme = createTheme({
    palette: {
        mode: 'light',
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
    typography,
})

theme = createTheme(theme, {
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '14px'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // Some CSS
                    // minWidth: 120,
                    // padding: '8px 16px',
                    fontFamily: 'ProximaNovaSemibold',
                    textTransform: "capitalize",
                },
                outlined: {
                    color: '#212529',
                    border: '1px solid #ddd',
                    '&:focus': {
                        backgroundColor: 'white',
                        border: `1px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main
                    }
                },
                contained: {
                    color: 'white',

                },
                endIcon: ({ ownerState, theme }) => {
                    let color = theme.palette.primary.main

                    if (ownerState.variant === 'contained')
                        color = 'white'
                    if (ownerState.disabled)
                        color = 'inherit'

                    return {
                        color
                    }
                }

            }
        }
    }
})

//  /**
//   * Material UI theme config for "Light Mode"
//   */
//  const LIGHT_THEME = {
//      palette: {
//          mode: 'light',
//          typography: {
//              fontFamily: [
//                  'ProximaNova-Regular',
//                  'Arial',
//                  'sans-serif',
//              ].join(','),
//              h1: {
//                  fontFamily: 'ProximaNovaRegular',
//              },
//              subtitle1: {
//                  fontFamily: 'ProximaNovaRegular',
//              },
//          },
//          background: {
//              paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
//              default: '#FFFFFF',
//          },
//          ...FONT_COLORS,
//      },

//  };

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */
const ThemeProvider = ({ children }) => {

    //    const theme = createTheme(LIGHT_THEME);

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <CssBaseline /* Material UI Styles */ />
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeProvider