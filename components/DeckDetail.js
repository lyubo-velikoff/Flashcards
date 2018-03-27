import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { white, black, gray } from '../utils/colors'
import { addDeck } from '../actions'
import Deck from './DeckCard'
import Button from './Button'
import { HeaderBackButton, NavigationActions } from 'react-navigation'

class DeckDetail extends Component {

	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params
		return {
      title: deckId,
      headerLeft: <HeaderBackButton tintColor={white} onPress={() => navigation.navigate('Home')} />,
		}
  }

  render() {
    const { decks, navigation } = this.props
    const displayQuizButton = decks.questions && decks.questions.length > 0 ? true : false
    return (
      <View style={styles.container}>
        {decks && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Deck {...decks} />
            <Button 
              text='Add Card'
              onPress={() => navigation.navigate('AddCard', { deckId: decks.title })}
            />
            {displayQuizButton && (
              <Button 
                text='Start Quiz'
                backgroundColor={gray}
                onPress={() => navigation.navigate('Quiz', { questions: decks.questions })}
              />
            )}
          </View>
        )}
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

export default connect(mapStateToProps)(DeckDetail)