import './DateTimePicker.css'
import { useState, useRef } from 'react'

import {
    Grid,
    Dialog,
    TextField,
    Stack
} from '@mui/material'

import { DesktopTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import enLocale from 'date-fns/locale/en-US';
import { isValid } from 'date-fns';

import { Divider } from 'UI'

import { deconstructDate } from 'utils/Parser'

const NumberInput = (props) => {
    return (
        <input
            type='number'
            name={props.name}
            min={props.min}
            max={props.max}
            maxLength={props.maxLength}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default function DateTimePicker(props) {
    const now = useRef(new Date())

    const [date, setDate] = useState(now.current)
    const [asap, setAsap] = useState(true)

    const onTimeChange = (time) => {
        //console.log(date)
        now.current = new Date()
        setDate(time)
        setAsap(false)

    }

    const onAsapClick = (e) => {
        now.current = new Date()
        setDate(now.current)
        setAsap(true)
    }

    const onSave = (e) => {
        let _date = isValid(date) ? date : now.current
        _date = _date < now.current ? now.current : _date
        onAsapClick()
        props.onSave(asap ? 'ASAP' : _date)
    }

    const onClose = () => {
        !isValid(date) && onAsapClick()
        props.onClose()
    }

    return (
        <Dialog
            open={props.open}
            maxWidth='md'
            fullWidth={true}
            onClose={props.onClose}
            scroll={"body"}
            PaperProps={{ style: { borderRadius: 4, padding: 0, background: "white" } }}
        >
            <Grid className='DateTimePicker'>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>

                    <Grid className='Header'>
                        <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='center'
                        >
                            <h2>SELECT DATE & TIME</h2>
                        </Grid>
                        <Grid
                            container
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                        >
                            <p>
                                {asap ?
                                    'ASAP'
                                    : date && date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
                                }
                            </p>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        sx={{ pt: 3 }}
                    >
                        <Grid item md={6} xs={12}
                            container
                            justifyContent={'center'}
                            alignItems='center'
                        >
                            {/* <Calendar
                          onChange={onCalendarChange}
                          value={date}
                        /> */}
                            <StaticDatePicker className='MuiCalendarPicker'
                                displayStaticWrapperAs="desktop"
                                showToolbar
                                disablePast
                                value={date}
                                onChange={onTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}
                            container
                            justifyContent={'center'}
                            alignItems='center'
                        >
                            <DesktopTimePicker
                                value={date}
                                onChange={onTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                        justify='flex-end'
                        style={{ paddingRight: 16 }}
                    >
                        <button
                            className={asap ? 'Action' : 'Action Outline'}
                            onClick={onAsapClick}
                        >
                            ASAP
                        </button>
                    </Grid>

                    <Divider />
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent={'flex-end'}
                        style={{ paddingBottom: 16, paddingRight: 16 }}
                    >
                        <button
                            className='Cancel'
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className='Action Bold'
                            onClick={onSave}
                        >
                            SAVE
                        </button>
                    </Stack>

                </LocalizationProvider>
            </Grid>
        </Dialog>
    )
}