import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }
    render() {
        const { currentUser } = this.props

        console.log()
        if (currentUser === undefined) {
            return (
                <View></View>
            )
        }
        return (
            <View>
                <Text>{currentUser.name} is logged in!</Text>
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUsser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsers }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)