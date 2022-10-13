export const components = {
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
                fontFamily: 'ProximaNovaSemibold',
                textTransform: "capitalize",
            },
            outlined: {
                color: '#212529',
                border: '1px solid #ddd',
                '&:focus': {
                    backgroundColor: 'white',
                    border: '1px solid theme.palette.primary.main',
                    color: 'theme.palette.primary.main'
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