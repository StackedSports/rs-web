import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import GardYearsTable from 'UI/Tables/GradYears/GradYearsTable'

import { useGradeYears } from 'Api/Hooks'

const GradYearsSettingsPage = () => {
    const gradYears = useGradeYears().items?.map((item, index) => ({ id: index, year: item })) || []
    const loading = useGradeYears().loading

    useEffect(() => {
        if(!gradYears)
            return
        
        console.log(gradYears)
    }, [gradYears])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
          title='Grad Years'
          topActionName='+ New Grad Year'
          onTopActionClick={onTopActionClick}
        >
            <GardYearsTable
              items={gradYears}
              loading={loading}
            />
        </SettingsPage>
    )
}

export default GradYearsSettingsPage