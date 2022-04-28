import { useState } from 'react'
import { TextField } from '@mui/material';
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const DatePicker = (props) => {
    const [value, setValue] = useState([null, null]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DateRangePicker
                clearable
                mask='__/__/____'
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                views={['month', 'date']}
                renderInput={
                    (startProps, endProps) => (
                        <>
                            <TextField
                                {...startProps}
                                label='Start Date'
                                margin='normal'
                                variant='outlined'
                                size='small'
                            />
                            <TextField
                                {...endProps}
                                label='End Date'
                                margin='normal'
                                variant='outlined'
                                size='small'
                            />
                        </>
                    )
                }
            />
        </LocalizationProvider>
    )
}

export default DatePicker