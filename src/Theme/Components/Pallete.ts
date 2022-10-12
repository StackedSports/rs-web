const common = {
    primary: {
        main: '#3871da',
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
    background: {
        paper: '#fff',
        default: '#fafafa',
        secondary: '#e9eaef'
    },
    ...common
}

export const darkPallete = {
    mode: 'dark',
    background: {
        default: '#303030',
        paper: '#424242',
        secondary: '#303030'
    },
    ...common
}