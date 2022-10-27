import { Components, Theme, alpha } from "@mui/material"

export const components: Components<Omit<Theme, "components">> = {
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