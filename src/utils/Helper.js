export const stringSplice = (string, idx, rem, str) => {
    return string.slice(0, idx) + str + string.slice(idx + Math.abs(rem))
}

export const findByIds = (ids, items) => {
    let results = []

    ids.forEach(id => {
        items.every(item => {
            if(item.id === id) {
                results.push(item)
                return false
            }

            return true
        })
    })

    return results
}

export const findById = (id, items) => {
    let found = null

    items.every(item => {
        if(item.id === id) {
            found = item
            return false
        }

        return true
    })

    return found
}

export const getStringListOfIds = (items) => {
    let string = ''

    items.forEach((item, index) => {
        string += item.id

        // if board is not last, add the a comma and space
        // before next board
        if(index !== items.length - 1)
            string += ','
    })

    return string
}