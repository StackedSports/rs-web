/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 */

 import { 
    createTheme,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    CssBaseline
} from '@mui/material';

 /**
  * Material UI theme "font" colors
  */
let theme = createTheme({
    pallete: {
        mode: 'light',
        primary: {
            main: '#3871da',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ffb74d', // Orange 300
            contrastText: '#000',
        },
        info: {
            main: '#0277bd', // Light Blue 800
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#2e7d32', // Green 800
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#f9a825', // Yellow 800
            // contrastText: '#000000',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#c62828', // Red 800
            contrastText: '#FFFFFF',
        },
    }
})

theme = createTheme(theme, {
    components: {
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
                        border: `1px solid ${theme.palette.primary.main}`
                    }
                },
                contained: {
                    color: 'white',
                    
                },
                endIcon: ({ ownerState, theme }) => {
                    let color = theme.palette.primary.main

                    if(ownerState.variant === 'contained')
                        color = 'white'
                    if(ownerState.disabled)
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