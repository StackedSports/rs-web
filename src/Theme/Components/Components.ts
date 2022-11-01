import { Components, Theme, alpha } from "@mui/material"

export const components: Components<Omit<Theme, "components">> = {
    MuiCssBaseline: {
        styleOverrides: (theme) => ({
            /* width */
            '::-webkit-scrollbar': {
                width: '5px',
                height: '5px',
            },

            /* Track */
            '::-webkit-scrollbar-track': {
                background: theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey.A400,
                borderRadius: '5px'
            },

            /* Handle */
            '::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === 'light' ? '#ccc' : theme.palette.grey.A700,
                borderRadius: '5px'
            },

            /* Handle on hover */
            '::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.mode === 'light' ? '#999' : theme.palette.grey.A700,
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