import { useState, useEffect } from 'react'

import SettingsPage from './SettingsPage'

import GradYearsTable from 'UI/Tables/GradYears/GradYearsTable'

import { useGradeYears } from 'Api/Hooks'

const GradYearsSettingsPage = () => {
    const gradYears = useGradeYears()
    // const loading = useGradeYears().loading

    const [items, setItems] = useState([])

    useEffect(() => {
        if(!gradYears.items)
            return
        
        setItems(gradYears.items.map((item, index) => ({ id: index, year: item })))
    }, [gradYears.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
          title='Grad Years'
          topActionName='+ New Grad Year'
          onTopActionClick={onTopActionClick}
        >
            <GradYearsTable
              items={items}
              loading={gradYears.loading}
            />
        </SettingsPage>
    )
}

export default GradYearsSettingsPage