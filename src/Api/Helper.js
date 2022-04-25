import { filterContacts } from './Endpoints'

export const getAssociatedContactByFileName = (fileName) => {
    return new Promise((resolve, reject) => {
        const nameParts = fileName.split(".")

        filterContacts(1, 10, { search: nameParts[0] })
            .then(([contacts, pagination]) => {
                console.log(contacts)

                if (contacts.length == 1) {
                    resolve(contacts[0])
                } else if (contacts.length > 1) {
                    let filteredData = []
                    reject("found multiple contacts")

                    contacts.forEach(contact => {
                        if (contact.first_name + " " + contact.last_name === nameParts[0])
                            filteredData.push(contact)
                    })

                    if (filteredData.length == 1)
                        resolve(filteredData[0])
                    else
                        reject("found multiple contacts")
                } else {
                    reject("could not find contacts")
                }
            }).catch((error) => {
                reject(error)
            })
    })
}