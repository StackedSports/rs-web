import './DateTimePicker.css'
import { useState, useRef, useEffect } from 'react'

import {
    Grid,
    Dialog,
    TextField,
    Stack,
    Button,
    Box
} from '@mui/material'

import { DesktopTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import enLocale from 'date-fns/locale/en-US';
import { isValid } from 'date-fns';
import { useGetMostRecentSendTimes } from 'Api/ReactQuery';

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
    const mostRecentSendTimes = useGetMostRecentSendTimes()
    const now = useRef(new Date())

    const [date, setDate] = useState(props.value && props.value !== 'ASAP' ? new Date(props.value) : now.current)
    const [asap, setAsap] = useState(props.value && props.value !== 'ASAP' ? false : true)

    useEffect(() => {
        if (!props.value)
            return

        setDate(props.value !== 'ASAP' ? new Date(props.value) : now.current)
        setAsap(props.value === 'ASAP' ? true : false)
    }, [props.value])

    const parseTime = (time) => {
        const matches = time.toLowerCase().match(/(\d{1,2}):(\d{2})([ap]m)/)
        const parsedTime = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2]
        date.setHours(parsedTime.split(':')[0], parsedTime.split(':')[1], 0)

        setAsap(false)
        setDate(oldDate => {
            const newDate = new Date(oldDate)
            newDate.setHours(parsedTime.split(':')[0], parsedTime.split(':')[1], 0)
            return newDate
        })
    }

    const onTimeChange = (time) => {
        //console.log(date)
        setDate(time)
        setAsap(false)
    }

    const onAsapClick = (e) => {
        now.current = new Date()
        setDate(now.current)
        setAsap(true)
    }

    const onSave = (e) => {
        now.current = new Date()
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
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 3

                            }}
                        >
                            <DesktopTimePicker
                                value={date}
                                onChange={onTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Box>
                                {
                                    mostRecentSendTimes.data && mostRecentSendTimes.data.length > 0 &&
                                    mostRecentSendTimes.data.map(time => {
                                        return (
                                            <Button key={time} onClick={() => parseTime(time)}>
                                                {time}
                                            </Button>
                                        )
                                    })
                                }
                            </Box>
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
                            style={{ marginLeft: 'auto' }}
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
            </Stack>
        </Dialog>
    )
}