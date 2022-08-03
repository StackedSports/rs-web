import { useState, useEffect } from 'react'
import { 
    addDoc, 
    setDoc, 
    getDoc, 
    getDocs, 
    collection, 
    doc, 
    onSnapshot, 
    updateDoc, 
    query, 
    where 
} from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { db, functions } from 'Api/Firebase'

const getRSUser = () => JSON.parse(localStorage.getItem('user'))

export const useKanbans = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [kanbans, setKanbans] = useState(null)

    useEffect(() => {
        const unsub = getKanbans((kanbans => {
            setKanbans(kanbans)
            setIsLoading(false)
        }))

        return () => unsub()
    }, [])

    return {
        items: kanbans,
        isLoading
    }
}

export const useKanban = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [kanban, setKanban] = useState(null)

    useEffect(() => {
        const unsub = getKanban(id, (kanbans => {
            setKanban(kanbans)
            setIsLoading(false)
        }))

        return () => unsub()
    }, [id])

    return {
        item: kanban,
        isLoading
    }
}

export const createKanban = (kanbanName) => {
    const user = getRSUser()

    const newKanbanRef = doc(collection(db, 'orgs', user.team.org.id, 'kanbans'))

    return setDoc(newKanbanRef, {
        id: newKanbanRef.id,
        name: kanbanName,
        columns: []
    })
}

export const getKanbans = (listener) => {
    const user = getRSUser()

    const kanbansRef = collection(db, 'orgs', user.team.org.id, 'kanbans')
    
    return onSnapshot(kanbansRef, (snapshot) => {
        const kanbans = []

        snapshot.forEach(doc => kanbans.push(doc.data()))

        listener(kanbans)
    })
}

export const getKanban = (id, listener) => {
    const user = getRSUser()

    const kanbanRef = doc(db, 'orgs', user.team.org.id, 'kanbans', id)
    
    return onSnapshot(kanbanRef, (snapshot) => {
        if(listener && typeof listener === 'function')
            listener(snapshot.data())
    })
}

export const updateColumns = (id, columns) => {
    const user = getRSUser()

    updateDoc(doc(db, 'orgs', user.team.org.id, 'kanbans', id), {
        columns
    })
}

export const addToTest = (columns) => {
    const user = getRSUser()

    updateDoc(doc(db, 'orgs', user.team.org.id, 'kanbans', 'test'), {
        columns
    })
}