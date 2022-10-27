import './DateTimePicker.css'
import { useState, useRef, useEffect, useMemo } from 'react'

import {
    Grid,
    Dialog,
    TextField,
    Stack,
    Button,
    Box,
    Divider
} from '@mui/material'

import { DesktopTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import enLocale from 'date-fns/locale/en-US';
import { isValid, addMinutes, subMinutes } from 'date-fns';
import { useGetMostRecentSendTimes } from 'Api/ReactQuery';


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
    const mostRecentSendTimes = useGetMostRecentSendTimes()
    const now = useRef(new Date())


    const SECONDARY_ACTION_LABEL = props.isExpirationTime ? 'No Expiration' : 'ASAP'


    const [date, setDate] = useState(props.value && props.value !== SECONDARY_ACTION_LABEL ? new Date(props.value) : now.current)
    const [asap, setAsap] = useState(props.value && props.value !== SECONDARY_ACTION_LABEL ? false : true)

    useEffect(() => {
        if (!props.value)
            return

        setDate(props.value !== SECONDARY_ACTION_LABEL ? new Date(props.value) : now.current)
        setAsap(props.value === SECONDARY_ACTION_LABEL ? true : false)
    }, [props.value])

    const parseTime = (time) => {
        const matches = time.toLowerCase().match(/(\d{1,2}):(\d{2})([ap]m)/)
        const parsedTime = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2]
        date.setHours(parsedTime.split(':')[0], parsedTime.split(':')[1], 0)

        setAsap(false)
        setDate(oldDate => {
            const newDate = new Date(oldDate)
            newDate.setHours(parsedTime.split(':')[0], parsedTime.split(':')[1], 0)

            console.log(newDate)

            return newDate
        })
    }

    const onTimeChange = (time) => {
        //console.log(date)
        setDate(time)
        setAsap(false)
    }

    const onAsapClick = (e) => {
        now.current = props.isExpirationTime ? addMinutes(new Date(), 10) : new Date()
        setDate(now.current)
        setAsap(true)
    }

    const onSave = (e) => {
        now.current = props.isExpirationTime ? addMinutes(new Date(), 10) : new Date()
        let _date = isValid(date) ? date : now.current
        _date = _date < now.current ? now.current : _date
        props.onSave(asap ? SECONDARY_ACTION_LABEL : _date)
        onAsapClick()
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
            PaperProps={{ sx: { borderRadius: 2, padding: 0 } }}
        >
            <Stack className='DateTimePicker'>
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
                                    SECONDARY_ACTION_LABEL
                                    : date && date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
                                }
                            </p>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        sx={{ pt: 2 }}
                    >
                        <Grid item md={6} xs={12}
                            container
                            justifyContent={'center'}
                            alignItems='center'
                        >
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                showToolbar
                                disablePast
                                value={date}
                                onChange={onTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}
                            spacing={2}
                            mt={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                px: 4
                            }}
                        >
                            <DesktopTimePicker
                                value={date}
                                onChange={onTimeChange}
                                minTime={props.isExpirationTime ? addMinutes(new Date(), 10) : subMinutes(new Date(), 1)}
                                disableIgnoringDatePartForTimeValidation={true}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Stack gap={1} direction='row' mt={1.2} flexWrap='wrap'>
                                {
                                    mostRecentSendTimes.data &&
                                    mostRecentSendTimes.data.length > 0 &&
                                    mostRecentSendTimes.data.map(time => {
                                        return (
                                            <Button key={time} onClick={() => parseTime(time)} variant='outlined'>
                                                {time}
                                            </Button>
                                        )
                                    })
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                        justify='flex-end'
                        sx={{ paddingRight: 2 }}
                    >
                        <button
                            style={{ marginLeft: 'auto' }}
                            className={asap ? 'Action' : 'Action Outline'}
                            onClick={onAsapClick}
                        >
                            {SECONDARY_ACTION_LABEL}
                        </button>
                    </Grid>

                    <Divider sx={{ my: 2 }} />
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent={'flex-end'}
                        sx={{ paddingBottom: 2, paddingRight: 2 }}
                    >
                        <Button
                            className='Cancel'
                            variant='contained'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            className='Action Bold'
                            onClick={onSave}
                        >
                            SAVE
                        </Button>
                    </Stack>

                </LocalizationProvider>
            </Stack>
        </Dialog>
    )
}