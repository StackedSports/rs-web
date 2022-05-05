import { useState, useEffect } from 'react'
import { TextField, styled } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

export const DatePicker = (props) => {
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
        if (props.onChange instanceof Function) {
            props.onChange(newValue);
        }
    }

    useEffect(() => {
        console.log(value);
    }, [value]);


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={null}
                clearable
                value={value}
                onChange={handleChange}
                renderInput={(params) => {
                    return <StyledInput
                        {...params} size='small'
                        inputProps={{
                            ...params.inputProps,      
                        }}
                    />
                }
                }
            />
        </LocalizationProvider>
    );
}

export default DatePicker;

const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        width: '9ch',
    },
}));