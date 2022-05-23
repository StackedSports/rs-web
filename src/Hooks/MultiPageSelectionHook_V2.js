import { useReducer } from 'react'
import lodash from 'lodash'

const initialState = {
    selectedIds: [],
    selectedData: [],
    count: 0,
}

const reducer = (state, action) => {
    // add and remove are to handle with on selection model change of mui data grid, internal use only
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
                selectedData: state.selectedData.filter(data => action.selectedIds.includes(data.id)),
                count: action.selectedIds.length,
            }
        case 'removeById':
            return {
                ...state,
                selectedIds: state.selectedIds.filter(id => id !== action.id),
                selectedData: state.selectedData.filter(data => data.id !== action.id),
                count: state.selectedIds.filter(id => id !== action.id).length,
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

    const onSelectionModelChange = (selection) => {
        let newIds = lodash.difference(selection, state.selectedIds)

        if (data && newIds.length > 0) {
            const newData = data.filter(item => newIds.includes(item.id))
            dispatch({ type: 'add', selectedIds: selection, data: newData })
        }
        else {
            dispatch({ type: 'remove', selectedIds: selection })
        }
    }

    return {
        selectionModel: state.selectedIds,
        count: state.count,
        selectedData: state.selectedData,
        onSelectionModelChange,
        remove: (id) => dispatch({ type: 'removeById', id }),
        clear: () => dispatch({ type: 'clear' }),
    }

}