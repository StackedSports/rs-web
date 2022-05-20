import { useState, useEffect } from 'react'
import { TextField, styled } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, isDate, isValid } from 'date-fns';

export const DatePicker = (props) => {
    const [value, setValue] = useState(null);
    const [formatStyle, setFormatStyle] = useState(props.format ? props.format : 'MM/dd/yyyy');

    const handleChange = (newValue) => {
        setValue(newValue);
        if (!isValid(newValue) || !isDate(newValue) || !isValid(value) || !isDate(value )) return;
        if (value && format(newValue, formatStyle) === format(new Date(value), formatStyle)) {
            //console.log("same date");
            return
        }
        //console.log("handleChange");
        if (props.onChange instanceof Function) {
            console.log("date picker changed to:", newValue)
            props.onChange(newValue);
        }
    }

    useEffect(() => {
        //console.log(props.value);
        if (props.value) {
            isDate(props.value) ? setValue(props.value) : setValue(new Date(props.value));
        }
    }, [props.value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={props.label}
                clearable
                value={value}
                onChange={handleChange}
                disableFuture={props.disableFuture}
                inputFormat={formatStyle}
                mask={formatStyle.replace(/[^\/]/g, '_')}
                renderInput={(params) => {
                    return <StyledInput
                        {...params} 
                        //size='small'
                    />
                }
                }
            />
        </LocalizationProvider>
    );
}

export default DatePicker;

const StyledInput = styled(TextField)(({ theme }) => ({
    
}));