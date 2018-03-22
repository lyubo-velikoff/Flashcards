import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { white, black, gray } from '../utils/colors'
import { connect } from 'react-redux'
import Button from './Button'

class AddCard extends Component {

	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params
		return {
			title: 'Add Card'
		}
  }

  state = {
    question: '',
    answer: ''
  }

  handleChange (fieldName, fieldValue) {
    this.setState((state) => {
      return {
        ...state,
        [fieldName]: fieldValue
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(question) => this.handleChange('question', question)}
          value={this.state.question}
          placeholder='Your question here'
          placeholderTextColor={gray}
        />
        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.handleChange('answer', answer)}
          value={this.state.answer}
          placeholder='Your answer here'
          placeholderTextColor={gray}
        />
        <Button text='Submit' onPress={() => console.log('pressed')} />
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
  }
})

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(AddCard)