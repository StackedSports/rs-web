import { useState } from 'react'
import lodash from 'lodash'

export default function useMultiPageSelection_V2(data) {
    const [selectedCount, setSelectedCount] = useState(0)
    const [selectedIds, setSelectedIds] = useState([])
    const [selectedData, setSelectedData] = useState([])

    const onSelectionModelChange = (selection) => {

        let newIds = lodash.difference(selection, selectedIds)
        let removedIds = lodash.difference(selectedIds, selection)

        if (data && newIds.length > 0) {
            const newData = data.filter(item => newIds.includes(item.id))
            setSelectedData(oldData => [...oldData, ...newData])
        }
        if (data && removedIds.length > 0) {
            const removedData = data.filter(item => removedIds.includes(item.id))
            setSelectedData(oldData => oldData.filter(item => !removedData.includes(item)))
        }

        setSelectedIds(selection)
        setSelectedCount(selection.length)
    }

    const clear = () => {
        setSelectedIds([])
        setSelectedData([])
        setSelectedCount(0)
    }

    return {
        selectionModel: selectedIds,
        selectedCount,
        selectedData,
        onSelectionModelChange,
        clear,
    }

}