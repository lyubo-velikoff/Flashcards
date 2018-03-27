import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView 
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck, receiveDecks } from '../actions'
import { saveDeckTitle, fetchDeckResults } from '../utils/api'
import { white, black, gray, red } from '../utils/colors'
import Button from './Button'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {

	state = {
    title: '',
    valid: true
  }

  handleChange (fieldName, fieldValue) {
    this.setState((state) => {
      return {
        ...state,
        [fieldName]: fieldValue
      }
    })
  }

  submit = () => {
    const { dispatch, navigation } = this.props
    const { valid, title } = this.state

    if (title) {

      saveDeckTitle(title)
        .then((deck) => dispatch(addDeck(deck)))
        .then(() => {
          this.refs['title'].setNativeProps({text: ''})
          this.setState(() => ({
            valid: true,
            title: ''
          })) 
        })
        .then(() => {
          fetchDeckResults()
            .then(( decks ) => dispatch(receiveDecks(decks)))
            .then(() => this.toDetail(title))
          })
          
        this.toHome()
    } else {
      this.handleChange('valid', false)
    }

  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'DeckDetail'
    }))
  }

  toDetail = (title) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: title }
    )
  }

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.label}>What is the title of your new deck ?</Text>
        <TextInput
          ref='title'
          style={[styles.input, !this.state.valid ? styles.inputError : '']}
          onChangeText={(title) => this.handleChange('title', title)}
          value={this.state.answer}
          placeholder='Deck title'
          placeholderTextColor={gray}
        />
        <Button text='Create Deck' onPress={this.submit} />
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
    backgroundColor: white,
    justifyContent: 'center'
  },
  input: {
    height: 50,
    borderColor: black,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 7
  },
  inputError: {
    borderColor: red
  },
  label: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center'
  }
})

function mapStateToProps (state) {
	return {}
}

export default connect(mapStateToProps)(AddDeck)