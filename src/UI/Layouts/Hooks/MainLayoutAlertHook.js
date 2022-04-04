import { useState, useEffect } from 'react'

const ALERT_TYPE = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}

const useMainLayoutAlert = (props) => {
    const [message, setMessage] = useState(props?.message || '')
    const [visible, setVisible] = useState(props?.visible || false)
    const [severity, setSeverity] = useState(props?.severity || ALERT_TYPE.info)

    const set = (message, severity) => {
        setMessage(message)
        setSeverity(severity)
        setVisible(true)
    }

    const setError = (message) => {
        set(message, ALERT_TYPE.error)
    }

    const setWarning = (message) => {
        set(message, ALERT_TYPE.warning)
    }

    const setInfo = (message) => {
        set(message, ALERT_TYPE.info)
    }

    const setSuccess = (message) => {
        set(message, ALERT_TYPE.success)
    }

    const dismiss = () => {
        setVisible(false)
    }

    return { 
        message,
        visible,
        severity,
        setError,
        setWarning,
        setInfo,
        setSuccess,
        dismiss
    }
}

export default useMainLayoutAlert