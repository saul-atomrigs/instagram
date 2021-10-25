import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'

import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Search() {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore().collection('users').where('name', '>=', search).get().then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data }
            })
            setUsers(users)
        })
    }
    return (
        <View>
            <TextInput placeholder="type here..." onChangeText={(search) => fetchUsers(search)} />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        onPress={() => props.navigation.navigate("Profile", { uid: item.id })}

                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
import Component2 from "https://framer.com/m/component2-9muk.js@PsYR6uwRD0wNvwHPgwll"

import Home from "https://framer.com/m/Home-EKk0.js@zTO7UDopELNnMha6Vzs7"
<Home
    // Using default values:
    image={image}
/>