import { useState, useEffect } from 'react'
import { TextField, styled } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers-pro';
import { isDate } from 'date-fns';

export const DatePicker = (props) => {
    const [value, setValue] = useState(null);
    const [formatStyle, setFormatStyle] = useState(props.format ? props.format : 'MM/dd/yyyy');

    const handleChange = (newValue) => {
        setValue(newValue);
        props.onChange(newValue);
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
                closeOnSelect
                value={value}
                minDate={props.minDate}
                onChange={handleChange}
                onError={(error) => {
                    console.log(error);
                }}
                disableFuture={props.disableFuture}
                inputFormat={formatStyle}
                mask={formatStyle.replace(/[^\/]/g, '_')}
                renderInput={(params) => {
                    return <StyledInput
                        {...params}
                        helperText={props.helperText}
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