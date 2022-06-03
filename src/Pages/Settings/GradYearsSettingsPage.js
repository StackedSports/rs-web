import { useState, useEffect } from 'react'

import SettingsPage from './SettingsPage'

import GradYearsTable from 'UI/Tables/GradYears/GradYearsTable'

import { useGradYears } from 'Api/ReactQuery'

const GradYearsSettingsPage = () => {
    const gradYears = useGradYears()
    // const loading = useGradYears().loading

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