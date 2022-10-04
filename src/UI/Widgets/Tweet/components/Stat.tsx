import { Skeleton, Stack, Typography } from "@mui/material"
import React from "react"

const round = (num: number) => {
    let m = Number((Math.abs(num) * 100).toPrecision(15))
    return Math.round(m) / 100 * Math.sign(num)
}

export const Stat = ({ label, value, total, loading }: { label: string, value: number, total: number, loading?: boolean }) => (
    <Stack>
        <Typography
            variant="h6"
            sx={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 36 }}
        >
            {loading ?
                <Skeleton /> :
                `${value === 0 ? 0 : round(value / total * 100)}%`
            }
        </Typography>
        <Typography
            variant="subtitle2"
            sx={{ width: "100%", textAlign: "center", fontWeight: 'bold', fontSize: 18 }}
        >
            {loading ?
                <Skeleton /> :
                `${label} (${value}/${total})`
            }
        </Typography>
    </Stack>
)