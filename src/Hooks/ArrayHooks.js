import { useState, useEffect } from 'react'


export default function useArray(initialState) {
    const [a, set] = useState(initialState ? initialState : [])

    useEffect(() => {
        //console.log("this should not be here")
        //console.log(initialState)
        if(initialState && Array.isArray(initialState)) {
            set(initialState)
           // console.log('set array to intial state')
        }
    }, [initialState])

    const all = (items) => {
        //console.log(items)
        set(items)
    }

    const push = (item) => {
        
        //console.log("Array push")
        let tmp = Object.assign([], a)
        tmp.push(item)
        set(tmp)
    }

    const remove = (index) => {
        let tmp = Object.assign([], a)
        tmp.splice(index, 1)
        set(tmp)
    }

    const clear = () => {
        set([])
    }

    const filter = (f) => {
        console.log(a.filter(f))
        set(a.filter(f))
    }

    const utils = {
        all, push, remove, clear, filter
    }

    return [ a, utils ]
}