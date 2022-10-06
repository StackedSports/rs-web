import React, { useContext, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from "Context/Auth/AuthProvider"
import { db } from 'Api/Firebase'
import { IUserPrefenreces } from "Interfaces";
import {
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    doc,
    onSnapshot,
    updateDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore'
import { rejects } from "assert";


export function useUserPreference() {
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext)

    const KEY = useMemo(() => ['orgs', user?.team.org.id, 'userPreferences', user?.id], [user])

    const contactPreferenceRef = user && doc(db, 'orgs', user.team.org.id, 'userPreferences', user.id)

    React.useEffect(() => {
        if (!contactPreferenceRef) return
        const unsubscribe = onSnapshot(contactPreferenceRef, (snapshot) => {
            console.log("snapshot data", snapshot.data())
            queryClient.setQueryData(KEY, snapshot.data());
        })

        return () => unsubscribe();
    }, [queryClient, KEY]);

    return useQuery<IUserPrefenreces>(
        KEY,
        () => new Promise<IUserPrefenreces>(() => { }),
    );
}

export const useUserPreferenceMutation = () => {
    const { user } = useContext(AuthContext)

    const contactPreferenceRef = user && doc(db, 'orgs', user?.team.org.id, 'userPreferences', user?.id)

    return useMutation((preference: IUserPrefenreces) => {
        if (!contactPreferenceRef)
            return Promise.reject(new Error('user id not set'))
        else
            return setDoc(contactPreferenceRef, preference)
    })

}