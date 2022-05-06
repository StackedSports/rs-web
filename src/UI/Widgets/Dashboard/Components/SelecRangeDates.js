import { useEffect, useState, useMemo } from 'react'
import { TextField, MenuItem } from '@mui/material'

export const SelecRangeDates = (props) => {
    return (
        <TextField
            size='small'
            inputProps={{ fontWeight: 'bold' }}
            label={null}
            select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        >
            {
                props.options.map(options =>
                    <MenuItem
                        key={options.id}
                        value={options.id}
                    >
                        {options.label}
                    </MenuItem>
                )
            }
        </TextField>
    )
}

export default SelecRangeDates