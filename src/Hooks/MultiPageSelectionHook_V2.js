import { useState, useReducer } from 'react'
import lodash from 'lodash'

const initialState = {
    selectedIds: [],
    selectedData: [],
    count: 0,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                selectedIds: action.selectedIds,
                selectedData: [...state.selectedData, ...action.data],
                count: action.selectedIds.length,
            }
        case 'remove':
            return {
                ...state,
                selectedIds: action.selectedIds,
                selectedData: state.selectedData.filter(data => !action.data.includes(data) ),
                count: action.selectedIds.length,
            }
        case 'clear':
            return {
                ...state,
                selectedIds: [],
                selectedData: [],
                count: 0,
            }
        default:
            throw new Error()
    }
}

export default function useMultiPageSelection_V2(data) {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)

    const onSelectionModelChange = (selection) => {

        let newIds = lodash.difference(selection, state.selectedIds)
        let removedIds = lodash.difference(state.selectedIds, selection)

        if (data && newIds.length > 0) {
            const newData = data.filter(item => newIds.includes(item.id))
            dispatch({ type: 'add', selectedIds: selection, data: newData })
        }
        if (data && removedIds.length > 0) {
            const removedData = data.filter(item => removedIds.includes(item.id))
            dispatch({ type: 'remove', selectedIds: selection, data: removedData })
        }

    }

    return {
        selectionModel: state.selectedIds,
        selectedCount: state.count,
        selectedData: state.selectedData,
        onSelectionModelChange,
        clear: () => dispatch({ type: 'clear' }),
    }

}