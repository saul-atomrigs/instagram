import firebase from 'firebase'
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants/index'

export function fetchUserPosts() {
    return (
        (dispatch) => {
            firebase.firestore()
                .collection('posts')
                .doc(firebase.auth().currentUser.uid)
                .collection('userPosts')
                .orderBy('creation', 'asc')
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id
                        return { id, ...data }
                    })
                    console.log(posts)
                    dispatch({ type: USER_STATE_CHANGE })
                })
        })
}