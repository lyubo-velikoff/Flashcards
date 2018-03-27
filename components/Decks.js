import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList 
} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDeckResults } from '../utils/api'
import { white, black, gray } from '../utils/colors'
import { AppLoading } from 'expo'
import Deck from './DeckCard.js'

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
  
  renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{ borderBottomWidth: 1, borderBottomColor: black, }} 
      onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        { deckId: item.title }
      )}
    >
      <Deck {...item}/>
    </TouchableOpacity>
  )
  

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList 
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function mapStateToProps (decks) {
  return { decks }
}

export default connect(mapStateToProps)(Decks)