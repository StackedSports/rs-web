import { colors, Components, Theme } from "@mui/material"

export const components: Components<Omit<Theme, "components">> = {
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                fontSize: '14px'
            }
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
                letterSpacing: 1,
            },
            outlined: ({ theme }) => ({
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
            }),
        }
    }
}