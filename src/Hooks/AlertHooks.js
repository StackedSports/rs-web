import { useState, useEffect } from 'react'
import useArray from './ArrayHooks'

export default function useAlerts(intialState) {
    const [alerts, setAlerts] = useArray()

    const push = (message) => {
        console.log("Alert push")
        let id = 'alert-' + Date.now()
        setAlerts.push({ id, message })
    }

    const remove = (index) => {
        setAlerts.remove(index)
    }

    const utils = {
        push, remove
    }

    return [alerts, utils]
}

// onMediaAlertClose = (index) => {}