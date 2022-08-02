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



export const getKanban = (id, listener) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const kanbanRef = doc(db, 'orgs', user.team.org.id, 'kanbans', id)
    return onSnapshot(kanbanRef, (snapshot) => {
        if(listener && typeof listener === 'function')
            listener(snapshot.data())
    })
}

export const updateColumns = (id, columns) => {
    const user = JSON.parse(localStorage.getItem('user'))

    updateDoc(doc(db, 'orgs', user.team.org.id, 'kanbans', id), {
        columns
    })
}

export const addToTest = (columns) => {
    const user = JSON.parse(localStorage.getItem('user'))

    updateDoc(doc(db, 'orgs', user.team.org.id, 'kanbans', 'test'), {
        columns
    })
}