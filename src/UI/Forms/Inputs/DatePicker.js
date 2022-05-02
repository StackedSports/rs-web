import { useState } from 'react'
import { TextField, styled, Stack, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DatePicker as DatePickerPro, DateRangePicker } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from 'UI/Widgets/Buttons/Button';

export const DatePicker = (props) => {
    const [value, setValue] = useState([null, null]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpenCalendar = () => {
        setShowCalendar(true);
        setOpen(true);
    }

    const handleCloseCalendar = (newDates) => {
        console.log(newDates)
        if (newDates[0] && newDates[1]) {
            if (props.onChange instanceof Function) {
                props.onChange(newDates.map(date => date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })))
            }
            setShowCalendar(false);
            setOpen(false);
        }
        else {
            setShowCalendar(false);
            setOpen(false);
        }
    }

    if (showCalendar) {
        return (
            <LocalizationProvider LocalizationProvider dateAdapter={AdapterDateFns} >
                <DateRangePicker
                    open={open}
                    clearable
                    allowSameDateSelection
                    //disableCloseOnSelect={true}
                    inputFormat="MM/dd"
                    mask='__/__'
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    onAccept={(date)=>handleCloseCalendar(date)}
                    renderInput={
                        (startProps, endProps) => (
                            <StyledInputArea>
                                <TextField {...startProps} size='small' autoFocus />
                                <TextField {...endProps} size='small' />
                            </StyledInputArea>
                        )}
                    toolbarFormat="MM/dd"
                />
            </LocalizationProvider>
        )
    } else {
        return <Button variant='outlined' name="Birthday" onClick={handleOpenCalendar} endIcon={<KeyboardArrowDown />} />
    }

}

export default DatePicker

const StyledInputArea = styled(Stack)({
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

    '& .MuiFormControl-root:first-of-type .MuiInputBase-root': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderRight: 0,
    },

    '& .MuiFormControl-root:last-of-type .MuiInputBase-root': {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,

    },

    '& .MuiInputBase-input': {
        fontWeight: '700',
        width: '8ch',
        padding: '8px 14px',
    },

})