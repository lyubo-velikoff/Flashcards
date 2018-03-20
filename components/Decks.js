import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDeckResults } from '../utils/api'
import { white, black, gray } from '../utils/colors'
import { AppLoading } from 'expo'

function Deck ({ title, questions }) {
  return (
    <View style={styles.card}>
      <Text style={{ fontSize: 18, color: black }}>{title}</Text>
      <Text style={{ fontSize: 14, color: gray }}>{questions.length} cards</Text>
    </View>
  )
}

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
  
  renderItem = ({ item }) => {
    return <Deck {...item}/>
  }

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
  card: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: black,
    backgroundColor: white,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
})

function mapStateToProps (decks) {
  return { decks }
}

export default connect(mapStateToProps)(Decks)