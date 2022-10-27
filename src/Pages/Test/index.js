
import { useState, useEffect } from 'react'

import { getFirestore, getDoc, doc, onSnapshot, collection, query } from 'firebase/firestore'
import { createContactSettings, generateDefaultLabels } from 'Api/ReactQuery/ContactSettingsPreference'

const Test = () => {
	/*     useEffect(() => {
			console.log('yo')
		    
			const db = getFirestore()
	
			const q = query(collection(db, 'test_twitter_activity_event'))
			const unsub = onSnapshot(q, snapshot => {
				let data = []
	
				snapshot.forEach(snap => data.push(snap.data()))
	
				console.log(data)
			})
	
			return () => unsub()
		}, []) */

/* 	useEffect(() => {
		console.log('saving default labels')

		const db = getFirestore()

		const q = query(collection(db, 'orgs'))
		const unsub = onSnapshot(q, snapshot => {
			if (snapshot) {
				const data = snapshot.docs.map(snap => snap.data().id)
				data.forEach(id => createContactSettings(generateDefaultLabels(), id))
			}
		})

		return () => unsub()
	}, []) */

	return (
		<div></div>
	)
}

export default Test