import './DateTimePicker.css'
import { useState, useRef } from 'react'

import {
    Grid,
    Dialog,
    Snackbar,
    makeStyles,
    withStyles,
    Slider,
    Backdrop,
} from "@material-ui/core"

import TextField from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import moment from "moment";

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
        console.log(time['_d'])
        console.log(date)
        now.current = new Date()
        setDate(time['_d'])
        setAsap(false)
        
    }

    const onAsapClick = (e) => {
        now.current = new Date()
        setDate(now.current)
        setAsap(true)
    }

    const onSave = (e) => {
        props.onSave(asap ? 'ASAP' : date)
    }

    return (
        <Dialog
          open={props.open}
          maxWidth='md'
          fullWidth={true}
          onClose={props.onClose}
          scroll={"body"}
          PaperProps={{ style: { borderRadius: 4, padding: 0, background: "white" }}}
        >
            <Grid className='DateTimePicker'>
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
                            :   date.toLocaleString('en-US', { dateStyle: 'full' , timeStyle: 'short'})
                            }
                        </p>
                    </Grid>
                </Grid>
                <Grid
                  container
                  direction='row'
                >
                    <Grid item md={6} xs={12}
                      container
                      justify='center'
                      alignItems='center'
                      style={{ paddingTop: 50 }}
                    >
                        {/* <Calendar
                          onChange={onCalendarChange}
                          value={date}
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <StaticDatePicker className='MuiCalendarPicker'
                                displayStaticWrapperAs="desktop"
                                // openTo="year"
                                minDate={moment(now.current)}
                                value={date}
                                onChange={onTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={6} xs={12}
                      container
                      justify='center'
                      alignItems='center'
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <StaticTimePicker
                                ampm
                                minTime={moment(now.current)}
                                // orientation="landscape"
                                // openTo="minutes"
                                value={date}
                                onChange={onTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
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
                
                <Divider/>
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  justify='flex-end'
                  style={{ paddingBottom: 16, paddingRight: 16 }}
                >
                    <button
                      className='Cancel'
                      onClick={props.onClose}
                    >
                        Cancel
                    </button>
                    
                    <button
                      className='Action Bold'
                      onClick={onSave}
                    >
                        SAVE
                    </button>
                </Grid>
            </Grid>
        </Dialog>
    )
}