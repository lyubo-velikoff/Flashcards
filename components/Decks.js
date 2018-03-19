import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDeckResults } from '../utils/api'
import { white } from '../utils/colors'
import { AppLoading } from 'expo'

class Decks extends Component {
	state = {
		ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    
    fetchDeckResults()
      .then(( decks ) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }
  
  render() {
    const { decks } = this.props
    const { ready } = this.state

    console.log('decks', decks)

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <Text>Decks: {JSON.stringify(decks)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)