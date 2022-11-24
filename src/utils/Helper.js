export const stringSplice = (string, idx, rem, str) => {
    return string.slice(0, idx) + str + string.slice(idx + Math.abs(rem))
}

export const findByIds = (ids, items) => {
    let results = []

    ids.forEach(id => {
        items.every(item => {
            if (item.id === id) {
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
        if (item.id === id) {
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
        if (index !== items.length - 1)
            string += ','
    })

    return string
}

/**
 * Fuction to help separate new tags name from existing tags id from SelectTagDialog with isAddTag = true
 * @param {Array} selectedTagsIds from SelectTagDialog 
 * @returns {Array} [newTagsNames, existingTagsIds]
 */
export const separeteNewTagsNameFromExistingTagsIds = (selectedTags) => {
    const [newTagsNames, alreadyExistingTags] = selectedTags.reduce(([newTagsNames, alreadyExistingTags], selectedTagIds) => {
        return selectedTagIds.toString().trim().startsWith('new') ?
            [newTagsNames.concat(selectedTagIds.replace('new-', '').trim()), alreadyExistingTags] :
            [newTagsNames, alreadyExistingTags.concat(selectedTagIds)]
    }, [[], []])

    return [newTagsNames, alreadyExistingTags]
}

export const getFileType = (file) => {

    switch (file?.file_type) {
        case 'image/png':
        case 'image/jpeg':
            return 'image'
        case 'image/gif':
            return 'gif'
        case 'application/pdf':
            return 'pdf'
        case 'video/mp4':
        case 'video/3gpp':
            return 'video'
        default:
            return 'unknown'
    }
}