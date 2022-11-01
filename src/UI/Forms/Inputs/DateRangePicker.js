import { useState } from 'react'
import { TextField, styled, Stack } from '@mui/material';
import { DateRangePicker as MuiDateRangePicker, DesktopDateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isEqual } from 'date-fns';
import Button from 'UI/Widgets/Buttons/Button';

/**
 * renders a date picker
 * @param {String} format - date format
 * @param {String} label - label of Button
 * @param {function} onChange - callback function
 * @returns 
 */
export const DateRangePicker = (props) => {
    const [value, setValue] = useState([null, null]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpenCalendar = () => {
        setShowCalendar(true);
        setOpen(true);
    }

    const handleCloseCalendar = (newDates) => {
        //console.log(newDates);
        const formatStyle = props.format ? props.format : 'MM/dd/yyyy';
        if (!value.every((date, index) => isEqual(date, newDates[index]) || date === newDates[index])) {
            if (props.onChange instanceof Function) {
                if (newDates[0] && newDates[1])
                    props.onChange(newDates.map(date => format(date, formatStyle)))
                else
                    props.onChange(newDates)
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
        const formatStyle = props.format ? props.format : 'MM/dd/yyyy';
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <MuiDateRangePicker
                    open={open}
                    clearable
                    allowSameDateSelection
                    disableFuture={props.disableFuture}
                    inputFormat={formatStyle}
                    mask={formatStyle.replace(/[^\/]/g, '_')}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    onAccept={(date) => handleCloseCalendar(date)}
                    onClose={() => { setOpen(false); setShowCalendar(false) }}
                    renderInput={
                        (startProps, endProps) => {
                            //console.log(startProps,endProps)
                            return (
                                <StyledInputArea format={formatStyle}>
                                    <TextField {...startProps} size='small' autoFocus />
                                    <TextField {...endProps} size='small' />
                                </StyledInputArea>
                            )
                        }}
                    toolbarFormat={formatStyle}
                />
            </LocalizationProvider>
        )
    } else {
        return <Button
            variant='outlined'
            name={props.label}
            onClick={handleOpenCalendar}
            endIcon={props.endIcon}
            startIcon={props.startIcon}
        />
    }

}

export default DateRangePicker

const StyledInputArea = styled(Stack)(({ format }) => ({
    display: 'flex',
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
        width: format.length + 2 + 'ch',
        padding: '8px 14px',
    },

}))