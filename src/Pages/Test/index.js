
import { useState, useEffect } from 'react'

import { getFirestore, getDoc, doc, onSnapshot, collection, query } from 'firebase/firestore'

const Test = () => {
    useEffect(() => {
        console.log('yo')
        
		const db = getFirestore()

		const q = query(collection(db, 'test_twitter_activity_event'))
		const unsub = onSnapshot(q, snapshot => {
			let data = []

			snapshot.forEach(snap => data.push(snap.data()))

			console.log(data)
		})

		return () => unsub()
	}, [])


    return (
        <div></div>
    )
}

export default Test