import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert,
} from 'react-native'
import { white, black, gray, red } from '../utils/colors'
import { connect } from 'react-redux'
import Button from './Button'
import { addCardToDeck, fetchDeckResults } from '../utils/api'
import { addCard, receiveDecks } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {

	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params
		return {
			title: 'Add Card'
		}
  }

  state = {
    question: '',
    answer: '',
    valid: true,
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
    const { question, answer } = this.state
    const { deckId } = navigation.state.params
    const card = {
      question: question,
      answer: answer
    }

    if (question && answer) {
      addCardToDeck(deckId, card)
        .then(() => dispatch(addCard(deckId, card)))
        .then(() => {
          this.refs['question'].setNativeProps({text: ''})
          this.refs['answer'].setNativeProps({text: ''})
          this.setState(() => ({
            valid: true,
            question: '',
            answer: '',
          })) 
        })
        .then(() => {
          fetchDeckResults()
            .then(( decks ) => dispatch(receiveDecks(decks)))
        })
        .then(() => {
          Alert.alert(
            'Would you like to add another card?',
            '',
            [
              {text: 'Yes', onPress: () => this.refs['question'].focus()},
              {text: 'No', onPress: () => {
                this.toDetail()
              }, style: 'cancel'},
            ],
            { cancelable: false }
          )
        })
    } else {
      this.handleChange('valid', false)
    }
    
  }

  toDetail = () => {
    const { navigation } = this.props
    navigation.navigate(
      'DeckDetail',
      { deckId: navigation.state.params.deckId}
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref='question'
          style={[styles.input, !this.state.valid && !this.state.question ? styles.inputError : '']}
          onChangeText={(question) => this.handleChange('question', question)}
          value={this.state.question}
          placeholder='Your question here'
          placeholderTextColor={gray}
        />
        <TextInput
          ref='answer'
          style={[styles.input, !this.state.valid && !this.state.answer ? styles.inputError : '']}
          onChangeText={(answer) => this.handleChange('answer', answer)}
          value={this.state.answer}
          placeholder='Your answer here'
          placeholderTextColor={gray}
        />
        <Button text='Submit' onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  input: {
    height: 50,
    borderColor: black,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 7,
  },
  inputError: {
    borderColor: red,
  }
})

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(AddCard)