import { useEffect} from 'react'
import { getBoards, getBoard, filterContacts } from 'Api/Endpoints'

const Test = () => {

    console.log('this it the test page')

    useEffect(() => {

        // filterContacts()
        //     .then(contacts => {
        //         console.log(contacts)
        //     })
        //     .catch(error => console.log(error))

        getBoard('wkYvOLsXXMGN')
            .then(boards => {
                console.log(boards)

                // filterContacts(boards[3].criteria)
            })
            // .then(contacts => {
            //     console.log(contacts)
            // })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>

        </div>
    )
}

export default Test