import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, black} from '../utils/colors'
import { addDeck } from '../actions'
import Deck from './DeckCard'
import Button from './Button'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params
		return {
			title: deckId
		}
  }
  
  render() {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Deck {...decks} />
          <Button 
            text='Add Card'
            onPress={() => this.props.navigation.navigate('AddCard', { deckId: decks.title })}
          />
          <Button onPress={() => console.log('submitted')} text='Start Quiz' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    decks: state[deckId]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)