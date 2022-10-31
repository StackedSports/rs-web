const common = {
    primary: {
        main: '#3871da',
        dark: '#7289da',
    },
    secondary: {
        main: '#f50057',
    },
    info: {
        main: '#0277bd',
    },
    success: {
        main: '#2e7d32',
    },
    warning: {
        main: '#f9a825',
    },
    error: {
        main: '#c62828',
    },
    neutral: {
        main: '#1f1919',
    },

}

export const lightPallete = {
    mode: 'light',
    ...common,
    background: {
        paper: '#fff',
        default: '#fafafa',
        secondary: '#e9eaef'
    },
}

export const darkPallete = {
    mode: 'dark',
    ...common,
    primary: {
        main: '#2383e2', // 19b2ff 5865f2 199bff 1500ff 3a28ff 19b2ff
    },
    neutral: {
        main: '#fff',
    },
    background: {
        secondary: '#303030',
        paper: '#424242',
        default: '#1C1D26'
    },
}