import { doc, setDoc } from 'firebase/firestore'

// Add a new document in collection 'cities'
await setDoc(doc(db, 'cities', 'LA'), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
})

// Merge new data with existing data 
const cityRef = doc(db, 'cities', 'BJ')
setDoc(cityRef, { capital: true }, { merge: true })

// Data types examples 
import { Timestamp } from 'firebase/firestore'
const docData = {
    stringExample: 'hello world',
    booleanExample: true,
    numberExample: 3.14,
    dateExample: Timestamp.fromDate(new Date('December 10, 2021')),
    arrayExample: [5, true, 'hello'],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: 'foo'
        }
    }
}
await setDoc(doc(db, 'data', 'one'), docData)

//  
class City {
    constructor(name, state, country) {
        this.name = name
        this.state = state
        this.country = country
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country
    }
}

// Firestore data converter 
const cityConverter = {
    toFirestore: (city) => {
        return {
            name: city.name,
            state: city.state,
            country: city.country,
        }
    },
    toFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new City(data.name, data.state, data.country)
    }
}

// Set with cityConverter 
const ref = doc(db, 'cities', 'LA').withConverter(cityConverter)
await setDoc(ref, new City("Los Angeles", "CA", "USA"))

// create document 
await setDoc(doc(db, 'cities', 'new-city-id'), data)

// Create document with ID generated
const docRef = await addDoc(collection(db, 'cities'), {
    name: 'Tokyo',
    country: 'Japan',
})
console.log('document written with ID: ', docRef.id)

import { collection } from 'firebase/firestore'
// Add a new document with a generated id
const newCityRef = doc(collection(db, 'cities'))
// later 
await setDoc(newCityRef, data)

// update some fields
const washingtonRef = doc(db, 'cities', 'DC')
// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
    capital: true
})

// Server time
const docRef = doc(db, 'objects', 'some-id')
// update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
})

// 중첩된 객체의 필드 업데이트
// create an initial document to update
const frankDocRef = doc(db, 'users', 'frank')
await setDoc(frankDocRef, {
    name: 'frank',
    favorites: { food: 'pizza', color: 'blue' },
    age: 12
})
// update the age and the favorite color
await updateDoc(frankDocRef, {
    'age': 13,
    'favorites.color': 'red'
})

// Create initial doc with DOT Notation
db.collection('users').doc('frank').set({
    name: 'frank',
    favorites: {
        food: 'pizza',
        color: 'blue',
    },
    age: 12
}).then(function () {
    console.log('frank created')
})

// update the doc without using dot notion
db.collection('users').doc('frank').update({
    favorites: { food: 'ice cream' }
}).then(function () {
    console.log('frank food updated')
})

// 배열 요소 업데이트
import { updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
const washingtonRef = doc(db, 'cities', 'DC')
// Add 
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
})
// remove
await updateDoc(washingtonRef, {
    regions: arrayRemove('east_coast')
})

