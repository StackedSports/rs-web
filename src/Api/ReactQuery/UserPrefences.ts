import React, { useContext, useEffect, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from "Context/Auth/AuthProvider"
import { db } from 'Api/Firebase'
import { IUserPrefenreces } from "Interfaces";
import {
    setDoc,
    doc,
    onSnapshot,
} from 'firebase/firestore'

export function useUserPreference() {
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext)

    const INITIAL_VALUES = {
        showColumnOnFilter: true,
    }

    const KEY = useMemo(() => ['user-preferences', user?.id], [user])

    const contactPreferenceRef = useMemo(() => user && doc(db, 'user-preferences', user.id), [user, db])

    useEffect(() => {
        if (!contactPreferenceRef) return
        const unsubscribe = onSnapshot(contactPreferenceRef, (snapshot) => {
            console.log("snapshot", snapshot)
            queryClient.setQueryData(KEY, snapshot.data());
        })

        return () => unsubscribe();
    }, [queryClient, KEY, contactPreferenceRef]);

    const reactQuery = useQuery<IUserPrefenreces>(
        KEY,
        () => new Promise<IUserPrefenreces>(() => { }),
    );

    return {
        ...reactQuery,
        data: reactQuery.data,
        item: reactQuery.data ?? INITIAL_VALUES
    }
}



export const useUserPreferenceMutation = () => {
    const { user } = useContext(AuthContext)
    const queryClient = useQueryClient();

    const contactPreferenceRef = useMemo(() => user && doc(db, 'user-preferences', user.id), [user, db])

    return useMutation((preference: IUserPrefenreces) => {
        if (!contactPreferenceRef)
            return Promise.reject(new Error('user is not set'))
        else
            return setDoc(contactPreferenceRef, preference)
    }, {
        onSuccess: () => { queryClient.invalidateQueries('user-preferences', { active: true }) }
    })

}