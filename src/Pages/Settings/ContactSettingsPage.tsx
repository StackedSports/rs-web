import React, { useEffect, useState, useMemo, useContext } from 'react'

import SettingsPage from './SettingsPage'
import { AuthContext } from 'Context/Auth/AuthProvider'

const ContactSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)

    return (
        <SettingsPage
            title='Contact Settings'
        >

        </SettingsPage>
    )
}

export default ContactSettingsPage