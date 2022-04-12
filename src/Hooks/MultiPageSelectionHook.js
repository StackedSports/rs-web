import { useState, useRef, useEffect } from 'react'

import useArray from './ArrayHooks'

export default function useMultiPageSelection(page) {
    const selected = useRef({})
    // Counts all selected data
    const [selectedCount, setSelectedCount] = useState(0)
    // Identifier for current page
    const [currentPage, setCurrentPage] = useState(`page-${page ? page : 1}`)
    // Selected ids on current page
    const [currentSelection, setCurrentSelection] = useArray()
    // Stores last page
    const lastPage = useRef('page-null')

    useEffect(() => {
        let newPage = `page-${page}`

        if(newPage === currentPage)
            return
        
        let lastSelection = selected.current[newPage]?.selection

        setCurrentPage(newPage)
        setCurrentSelection.all(lastSelection ? lastSelection : [])
    }, [page])

    const saveData = (data) => {
        console.log(data)
        
        if(!selected.current[currentPage])
            return

        let results = []

        currentSelection.forEach(id => {
            data.every(item => {
                if(item.id === id) {
                    results.push(item)
                    return false
                }

                return true
            })
        })

        selected.current[currentPage].data = results
    }

    const onSelectionChange = (selection) => {
        if(!selected.current[currentPage])
            selected.current[currentPage] = {}

        selected.current[currentPage].selection = selection
        setCurrentSelection.all(selection)
        setSelectedCount(getSelectedCount())
    }

    const getSelectedCount = () => {
        let count = 0

        Object.keys(selected.current).forEach(key => {
            count += selected.current[key].selection.length
        })

        return count
    }

    const getDataSelected = () => {
        let data = []
    
        Object.keys(selected.current).forEach(key => {
            // if(key !== currentPage)
                data = data.concat(selected.current[key].data)
        })
    
        return data   
    }

    const remove = (id) => {
        let currentIndex = -1
        Object.keys(selected.current).every(key => {
            return selected.current[key].selection.every((selectedId, index) => {
                if(selectedId === id) {
                    currentIndex = index
                    selected.current[key].selection.splice(index, 1)
                    return false
                }
                return true
            })
        })
        setCurrentSelection.remove(currentIndex)
        setSelectedCount(selectedCount => selectedCount - 1)
    }

    const clear = () => {
        selected.current = {}
        setCurrentSelection.clear()
        setSelectedCount(0)
    }

    // const onPageChange = (page, data) => {
    //     selected.current[currentPage].data = 
    // }


    return [ 
        currentSelection, 
        selectedCount, 
        { onSelectionChange, saveData, getDataSelected, remove, clear }]
}