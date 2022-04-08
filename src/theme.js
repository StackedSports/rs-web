/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 */

import { createTheme, ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';

/**
 * Material UI theme "front" colors
 */
const FRONT_COLORS = {
  primary: {
    main: '#3871da', 
    contrastText: '#000000',
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
};

const TYPOGRAPHY = {
  typography: {
    fontFamily: [
      'ProximaNovaRegular',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'ProximaNovaRegular',
    },
    subtitle1: {
      fontFamily: 'ProximaNovaRegular',
    },
    body1: {
      fontFamily: 'ProximaNovaRegular',
    },
    subtitle2: {
      fontFamily: 'ProximaNovaRegular',
      fontSize: '50px',
    },
    title:{
      fontFamily: 'ProximaNovaRegular',
      fontSize: '18px',
      fontWeight: 700,
    },
    title2:{
      fontFamily: 'ProximaNovaSemibold',
      fontSize: '16px',
    }
  },
}

/**
 * Material UI theme config for "Light Mode"
 */
const LIGHT_THEME = {
  palette: {
    mode: 'light',
    background: {
      paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
      default: '#FFFFFF',
    },
    ...FRONT_COLORS,
  },
  ...TYPOGRAPHY,
};

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */
const AppThemeProvider = ({ children }) => {

  const theme = createTheme(LIGHT_THEME);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline /* Material UI Styles */ />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export { AppThemeProvider };
