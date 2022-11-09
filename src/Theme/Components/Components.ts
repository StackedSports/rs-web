import { Components, Theme, alpha } from "@mui/material"

export const components: Components<Omit<Theme, "components">> = {
    MuiCssBaseline: {
        styleOverrides: (theme) => ({
            /* width */
            '::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
            },

            /* Track */
            '::-webkit-scrollbar-track': {
                background: theme.palette.mode === 'light' ? theme.palette.grey.A100 : 'hsl(210,9%,30%)',
                borderRadius: '5px'
            },

            /* Handle */
            '::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === 'light' ? '#ccc' : 'hsl(216, 7%, 13%)', //
                borderRadius: '5px'
            },

            /* Handle on hover */
            '::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.mode === 'light' ? '#999' : 'hsl(216, 7%, 10%)',
            },

            ':: -webkit-scrollbar-corner': {
                backgroundColor: 'transparent',
            },
        })
    },
    MuiTooltip: {
        styleOverrides: {
            tooltip: ({ theme }) => ({
                fontSize: '14px',
                backgroundColor: alpha(theme.palette.common.black, .8),
                '.MuiTooltip-arrow': {
                    color: alpha(theme.palette.common.black, .8),
                }

            })
        }
    },
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: {
                fontFamily: 'ProximaNovaSemibold',
                textTransform: "capitalize",
                letterSpacing: .5,
            },
            outlined: ({ theme }) => ({
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
            }),
        }
    },
}