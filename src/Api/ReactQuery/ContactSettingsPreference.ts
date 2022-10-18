import React, { useContext, useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "Context/Auth/AuthProvider"
import { db } from 'Api/Firebase'
import {
    setDoc,
    updateDoc,
    doc,
    onSnapshot,
    DocumentSnapshot,
} from 'firebase/firestore'
import { contactKeys, labelType, labelValues } from "Pages/Settings/ContactSettingsPage";
import lodash from 'lodash'

const CONFIG_VALUES: [contactKeys, Pick<labelValues, 'customizable' | 'type' | 'label'>][] = [
    ['full_name', {
        label: 'Full Name',
        type: 'text',
        customizable: false,
    }],
    ['first_name', {
        label: 'First Name',
        type: 'text',
        customizable: false,
    }],
    ['last_name', {
        label: 'Last Name',
        type: 'text',
        customizable: false,
    }],
    ['twitter_profile', {
        label: 'Twitter',
        type: 'text',
        customizable: false,
    }],
    ['dob', {
        label: 'Birthday',
        type: 'date-picker',
        customizable: false,
    }],
    ['phone', {
        label: 'Phone',
        type: 'text',
        customizable: false,
    }],
    ['nick_name', {
        label: 'Nick Name',
        type: 'text',
        customizable: true,
    }],
    ['state', {
        label: 'State',
        type: 'select',
        customizable: true,
    }],
    ['high_school', {
        label: 'School',
        type: 'text',
        customizable: true,
    }],
    ['grad_year', {
        label: 'Grad Year',
        type: 'text',
        customizable: true,
    }],
    ['relationships', {
        label: 'Relationships',
        type: 'multi-select',
        customizable: true,
    }],
    ['opponents', {
        label: 'Opponents',
        type: 'multi-select',
        customizable: true,
    }],
    ['positions', {
        label: 'Position',
        type: 'multi-select',
        customizable: true,
    }],
    ['area_coach', {
        label: 'Area Coach',
        type: 'select',
        customizable: true,
    }],
    ['position_coach', {
        label: 'Position Coach',
        type: 'select',
        customizable: true,
    }],
    ['coordinator', {
        label: 'Recruiting Coach',
        type: 'select',
        customizable: true,
    }], //recruiting coach
    ['status', {
        label: 'Status',
        type: 'select',
        customizable: true,
    }],
    ['status_2', {
        label: 'Status 2',
        type: 'select',
        customizable: true,
    }],
    ['tags', {
        label: 'Tags',
        type: 'multi-select',
        customizable: true,
    }],
    ['rank', {
        label: 'Rank',
        type: 'multi-select',
        customizable: true,
    }],
    ['time_zone', {
        label: 'Time Zone',
        type: 'select',
        customizable: true,
    }],
]

const createDefaultValues = (key: contactKeys, config: Pick<labelValues, 'customizable' | 'type'>, index: number): labelValues => ({
    id: uuidv4(),
    ...config,
    enabled: true,
    index: index,
    label: key,
})

const generateDefaultLabels = (): labelType => {
    return CONFIG_VALUES.map(
        ([key, values], i) => [key, createDefaultValues(key, values, i)]
    )
}

export const useContactSettings = () => {
    const { user } = useContext(AuthContext)
    const [storadeValue, setValue] = useState<labelType>([])
    const [loading, setLoading] = useState(true)

    const contactPreferenceRef = useMemo(() => user && doc(db, 'orgs', user.team.org.id, 'preferences', 'contact_labels'), [user, db])

    useEffect(() => {
        if (!contactPreferenceRef) return

        const unsubscribe = onSnapshot<Record<contactKeys, labelValues>>(contactPreferenceRef, (snapshot: DocumentSnapshot<Record<contactKeys, labelValues>>) => {
            if (!snapshot.data()) {
                const initialValues = generateDefaultLabels()
                createContactSettings(initialValues, user)
                    .then(() => {
                        console.log("new prefrence created")
                        setValue(initialValues)
                    })
                    .catch((e) => console.log("Error on creating new contacts settings", e))
                    .finally(() => setLoading(false))
            } else {
                // console.log("snapshot preference", snapshot.data())
                const labelsObject = snapshot.data()
                if (labelsObject) {
                    setValue(lodash.sortBy(Object.entries(labelsObject), (array) => array[1].index))
                }
                setLoading(false)
            }
        })

        return () => unsubscribe();
    }, [contactPreferenceRef]);

    const setLabels = (value: labelType | ((prev: labelType) => labelType)) => {

        const newValue = value instanceof Function ? value(storadeValue) : value
        updateContactSettings(newValue, user)
            .then(() => {
                console.log("new updated created")
            })
            .catch((e) => console.log("Error on creating new contacts settings", e))
            .finally(() => setLoading(false))
    }

    return {
        labels: storadeValue,
        setLabels,
        loading
    }
}

export const createContactSettings = (labels: labelType, user: any) => {
    if (!user) return Promise.reject(new Error('user is not set'))

    const contactPreferenceRef = doc(db, 'orgs', user.team.org.id, 'preferences', 'contact_labels')

    return setDoc(contactPreferenceRef, Object.fromEntries(labels))
}
export const updateContactSettings = (labels: labelType, user: any) => {
    if (!user) return Promise.reject(new Error('user is not set'))

    const contactPreferenceRef = doc(db, 'orgs', user.team.org.id, 'preferences', 'contact_labels')

    return updateDoc(contactPreferenceRef, Object.fromEntries(labels))
}