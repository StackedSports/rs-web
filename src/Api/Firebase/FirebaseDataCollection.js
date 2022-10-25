import { useContext, useEffect } from 'react'

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

import { AuthContext } from 'Context/Auth/AuthProvider'

const saveOrgData = async (org) => {
    // org = {
    //     id,
    //     logo: {
    //         large,
    //         medium,
    //         original,
    //         thumb
    //     },
    //     mascot,
    //     name,
    //     nickname,
    //     primary_color,
    //     secondary_color
    // }

    const orgRef = doc(db, 'orgs', org.id)

    const orgDoc = await getDoc(orgRef)
    const orgData = orgDoc.data()

    const now = Date.now()

    if(!orgData) {
        // org data does not exist in firebase, so let's save it

        console.log('FirebaseDataCollection: Org data was not saved in firebase, so we are saving it!')

        setDoc(orgRef, {
            ...org,
            savedAt: now,
            updatedAt: now
        })

        return
    }

    // console.log(orgData.updatedAt)

    if(orgData.updatedAt < now - 1000 * 60 * 60 * 24 * 7) {
        // org data exists in firebase and it is not up to date
        // (we are updating it every week), so let's update it

        console.log('FirebaseDataCollection: Org data was not up to date, so we are updating it!')

        setDoc(orgRef, {
            ...orgData,
            ...org,
            updatedAt: Date.now()
        })
    }
}

const saveTeamMemberData = async (user) => {
    const userRef = doc(db, 'team_members', user.id)

    const userDoc = await getDoc(userRef)
    const userData = userDoc.data()

    const now = Date.now()

    if(!userData) {
        // org data does not exist in firebase, so let's save it

        console.log('FirebaseDataCollection: User data was not saved in firebase, so we are saving it!')

        setDoc(userRef, {
            ...user,
            orgId: user.team.org.id,
            savedAt: now,
            updatedAt: now
        })

        return
    }

    // console.log(orgData.updatedAt)

    if(userData.updatedAt < now - 1000 * 60 * 60 * 24 * 2) {
        // org data exists in firebase and it is not up to date
        // (we are updating it every week), so let's update it

        console.log('FirebaseDataCollection: User data was not up to date, so we are updating it!')

        updateDoc(userRef, {
            ...user,
            updatedAt: Date.now()
        })
    }
}

const FirebaseDataCollection = ({ children }) => {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        //console.log(user)

        if(!user) return

        saveOrgData(user.team.org)
        saveTeamMemberData(user)
    }, [user])

    return children
}

export default FirebaseDataCollection