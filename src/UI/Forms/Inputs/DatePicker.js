import { useState, useEffect } from 'react'
import { TextField, styled } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

export const DatePicker = (props) => {
    const [value, setValue] = useState(new Date());

    
    const handleChange = (newValue) => {

        if (value && format(newValue, "yyyy-MM-dd") === format(new Date(value), "yyyy-MM-dd")) return;
        console.log("handleChange");
        setValue(newValue);
        if (props.onChange instanceof Function) {
            console.log("date picker changed")
            props.onChange(newValue);
        }
    }

    useEffect(() => {
        if (props.value instanceof Date)
            setValue(props.value);
    }, [props.value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={null}
                clearable
                value={value}
                onChange={handleChange}
                disableFuture={props.disableFuture}
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